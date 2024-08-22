<?php

    namespace App\Http\Controllers;

    use App\Events\RecipeUploaded;
    use App\Models\User;
    use App\Notifications\RecipeNotification;
    use App\Models\Ingredient;
    use App\Models\Recipe;
    use Illuminate\Http\Request;
    use Illuminate\Notifications\Events\BroadcastNotificationCreated;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Log;
    use Illuminate\Support\Facades\Storage;
    use Inertia\Inertia;
    use Intervention\Image\Drivers\Gd\Driver;
    use Intervention\Image\ImageManager;

    class RecipeController extends Controller
    {
        /**
         * Display a listing of the resource.
         */
        public function index(Request $request)
        {
            //get the currently authenticated user
            $user = Auth::user();

            $users = User::paginate(10);
            //Determine if the user wants to see only followed user's recipes
            $showFollowing = $request->query('filter') === 'following';

            if($showFollowing) {

                // get recipes only from users the current user is following.
                $recipes = Recipe::whereIn('user_id', $user->following()->pluck('following_user_id'))
                    ->with(['categories', 'ingredients', 'user'])
                    ->orderBy('created_at', 'desc')
                    ->paginate(10);
            }else {

                // Retrieve all recipes with their related categories and ingredients using eager loading
                $recipes = Recipe::with(['categories', 'ingredients', 'user'])
                    ->orderBy('created_at', 'desc')
                    ->paginate(10);
            }
            // Add bookmark status to each recipe
            $recipes->getCollection()->transform(function ($recipe) {
                $recipe->is_bookmarked = auth()->user()->bookmarkedRecipes->contains($recipe->id);
                return $recipe;
            });

            $categories = $user->categories()->get();

            // Return the recipes to the Inertia View
            return Inertia::render('Recipes/Index', [
                'auth' => [
                    'user' => auth()->user(),
                ],
                'users' => $users,
                'recipes' => $recipes,
                'categories' => $categories,
                'links' => $recipes->links(), // Include pagination links
                'showFollowing' => $showFollowing
            ]);
        }

        /**
         * Show the form for creating a new resource.
         */
        public function create()
        {
            // Return the form for creating a new recipe
            return Inertia::render('Recipes/Create');
        }

        /**
         * Store a newly created resource in storage.
         */
        public function store(Request $request)
        {
            // Validate the request data

            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'instruction' => 'required|string',
                'image_url' => 'nullable|image|max:2048',
                'ingredients' => 'required|array',
                'ingredients.*.name' => 'required|string',
                'ingredients.*.quantity' => 'required|string',
                'ingredients.*.unit' => 'required|string',
            ]);

            // Create a new recipe associated with the authenticated user
            $recipe = $request->user()->recipes()->create($request->only(['title', 'description', 'instruction']));

            if ($request->hasFile('image_url')) {
                $recipe->image_url = $request->file('image_url');
                $recipe->save();
            }
            // Sync the categories
//        $recipe->categories()->sync($request->categories);

            //Attach the ingredients to the recipe with quantities and units
            foreach ($request->ingredients as $ingredientData) {
                $ingredientName = ucfirst(strtolower($ingredientData['name']));
                $ingredient = Ingredient::firstOrCreate(['name' => $ingredientName]);

                //convert the quantity to a decimal if it's a fraction.
                $quantity = fractionToDecimal($ingredientData['quantity']);

                $recipe->ingredients()->attach($ingredient->id, [
                    'quantity' => $quantity,
                    'unit' => $ingredientData['unit']
                ]);
            }


            broadcast(new RecipeUploaded($recipe))->onQueue(env('QUEUE_BROADCAST','broadcast_queue'));

            $followers = $request->user()->followers;
            foreach ($followers as $follower) {
               $follower->notify(new RecipeNotification($recipe))->onQueue(env('QUEUE_NOTIFICATIONS','notifications_queue'));
            }


            // Redirect to the recipes index page
            return redirect()->route('recipes.index');
        }

        /**
         * Display the specified resource.
         */
        public function show(Recipe $recipe)
        {
            // Load the related categories and ingredients for the recipe using eager loading
            $recipe->load(['categories', 'ingredients']);

            // Return the recipe to the Inertia view
            return Inertia::render('Recipes/Show', ['recipe' => $recipe]);
        }

        /**
         * Show the form for editing the specified resource.
         */
        public function edit(Recipe $recipe)
        {
            // Return the form for editing the recipe
            $recipe->load(['ingredients']);
            return Inertia::render('Recipes/Edit', ['recipe' => $recipe]);
        }

        /**
         * Update the specified resource in storage.
         */
        public function update(Request $request, Recipe $recipe)
        {
            // Validate the request data
          $request->validate([
                'title' => 'sometimes|string|max:255',
                'description' => 'sometimes|string',
                'instruction' => 'sometimes|string',
                'image_url' => 'nullable|image|max:2048',
                'ingredients' => 'required|array|min:1',
                'ingredients.*.name' => 'required|string',
                'ingredients.*.quantity' => 'required|string',
                'ingredients.*.unit' => 'required|string',
            ]);

            // Update the recipe fields
            $recipe->update($request->only('title', 'description', 'instruction'));

            // Handle image upload if present
            if ($request->hasFile('image_url')) {
                // Delete the old image from Digital Ocean Spaces
                if ($recipe->image_url) {
                    $oldPath = str_replace(Storage::disk('spaces')->url("images/user_uploads/user_{$recipe->user_id}/recipe_images"), "images/user_uploads/user_{$recipe->user_id}/recipe_images", $recipe->image_url);
                    Storage::disk('spaces')->delete($oldPath);
                }
                $image = $request->file('image_url');

                // Initialize ImageManager with driver
                $manager = new ImageManager(new Driver());
                $resizedImage = $manager->read($image->getPathname())->resize(800, 600)->toJpg(75);

                $path = "images/user_uploads/user_{$request->user()->id}/recipe_images/{$image->hashName()}";
                Storage::disk('spaces')->put($path, (string)$resizedImage, 'public');
                $recipe->image_url = Storage::disk('spaces')->url($path);
                $recipe->save();
            }

            // Sync the ingredients with quantities and units
            $recipe->ingredients()->detach();
            foreach ($request->input('ingredients', []) as $ingredientData) {
                $ingredientName = ucfirst(strtolower($ingredientData['name']));
                $ingredient = Ingredient::firstOrCreate(['name' => $ingredientName]);

                $recipe->ingredients()->attach($ingredient->id, [
                    'quantity' => $ingredientData['quantity'],
                    'unit' => $ingredientData['unit'],
                ]);
            }

            // Redirect to the recipes index page
            return redirect()->route('recipes.index');
        }

        /**
         * Remove the specified resource from storage.
         */
        public function destroy(Recipe $recipe)
        {

            // Delete the image from Digital Ocean Spaces
            if ($recipe->image_url) {
                $oldPath = str_replace(Storage::disk('spaces')->url("images/user_uploads/user_{$recipe->user_id}/recipe_images"), "images/user_uploads/user_{$recipe->user_id}/recipe_images", $recipe->image_url);
                Storage::disk('spaces')->delete($oldPath);
            }
            // Delete the recipe
            $recipe->delete();

            // Redirect to the recipes index page
            return redirect()->route('recipes.index');
        }

        public function search(Request $request)
        {
            $query = $request->input('query');
            $searchType = $request->input('type');

            if($searchType === 'recipes') {
                $results = Recipe::where('title', 'like', '%' . $query . '%')
                    ->orWhere('description', 'like', '%' . $query . '%')
                    ->orderBy('created_at', 'desc')
                    ->with('user')
                    ->paginate(10);
                return Inertia::render('Recipes/Index', [
                    'recipes' => $results,
                    'query' => $query,
                ]);
            }elseif( $searchType === 'users') {
                $results = User::where('name', 'like', '%' . $query . '%')
                    ->orderBy('created_at', 'desc')
                    ->paginate(10);
                return Inertia::render('Recipes/Index', [
                    'users' => $results,
                    'query' => $query,
                ]);
            }

        }

        public function bookmark(Request $request, Recipe $recipe) {
            $user = $request->user();

            //Toggle the bookmark
            $user->bookmarkedRecipes()->toggle($recipe->id);
            return response()->json(['success' => true]);
        }

        public function like(Recipe $recipe){
            $user = auth()->user();
            if(!$user->hasLiked($recipe)){
                $user->like($recipe);
            }
            return response()->json(['success' => true]);
        }

        public function repost(Recipe $recipe){
            $user = auth()->user();
            if(!$user->hasReposted($recipe)){
                $user->repost($recipe);
            }
            return response()->json(['success' => true]);
        }
    }

