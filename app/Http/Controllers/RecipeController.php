<?php

    namespace App\Http\Controllers;

    use App\Models\Category;
    use App\Models\Ingredient;
    use App\Models\Recipe;
    use Illuminate\Http\Request;
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
        public function index()
        {
            // Retrieve all recipes with their related categories and ingredients using eager loading
            $recipes = Recipe::with(['categories', 'ingredients'])
                ->orderBy('created_at', 'desc')
                ->paginate(10);

            $categories = Category::with('user')->get();

            // Return the recipes to the Inertia View
            return Inertia::render('Recipes/Index', [
                'recipes' => $recipes,
                'categories' => $categories,
                'links' => $recipes->links(), // Include pagination links
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

                $recipe->ingredients()->attach($ingredient->id, [
                    'quantity' => $ingredientData['quantity'],
                    'unit' => $ingredientData['unit']
                ]);
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

            $results = Recipe::where('title', 'like', '%' . $query . '%')
                ->orWhere('description', 'like', '%' . $query . '%')->orderBy('created_at', 'desc')
                ->paginate(10);

            return Inertia::render('Recipes/Index', [
                'recipes' => $results,
                'query' => $query,
            ]);
        }
    }

