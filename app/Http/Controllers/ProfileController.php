<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
//    public function edit(Request $request, User $user = null): Response
//    {
//        $user = $user ?: $request->user();
//        $authUser = $request->user();
//        $isOwnProfile = $authUser->id === $user->id;
//        $isFollowing = $authUser->following()->where('following_user_id', $user->id)->exists();
//
//        //fetch followers
//        $followers = $user->followers;
//
//        $following = $user->following;
//        //fetch recipe count
//
//        $recipeCount = $user->recipes()->count();
//
//
//        return Inertia::render('Profile/Edit', [
//            'mustVerifyEmail' => $authUser instanceof MustVerifyEmail,
//            'status' => session('status'),
//            'user' => $user,
//            'authUser' => $authUser,
//            'isFollowing' => $isFollowing,
//            'isOwnProfile' => $isOwnProfile,
//            'followers' => $followers,
//            'following' => $following,
//            'followersCount' => count($followers),
//            'recipeCount' => $recipeCount,
//        ]);
//    }

//    public function show(Request $request, User $user){
//        $authUser = $request->user();
//        $isFollowing = $authUser->following()->where('following_user_id', $user->id)->exists();
//
//        //fetch followers
//        $followers = $user->followers;
//
//        $recipeCount = $user->recipes()->count();
//
//        return Inertia::render('Profile/Edit', [
//            'mustVerifyEmail' => $authUser instanceof MustVerifyEmail,
//            'status' => session('status'),
//            'user' => $user,
//            'authUser' => $authUser,
//            'isFollowing' => $isFollowing,
//            'isOwnProfile' => $authUser->id === $user->id,
//            'followersCount' => count($followers),
//            'recipeCount' => $recipeCount,
//        ]);
//    }

    public function show($username){
        $user = User::where('name', $username)->orWhere('slug', $username)->firstOrFail();
        $authUser = Auth::user();
        $isOwnProfile = $authUser && $authUser->id === $user->id;


        // check if the auth user is following the profile user
        $isFollowing = $authUser && $authUser->following()->where('following_user_id', $user->id)->exists();


        $followers = $user->followers;
        $following = $user->following;
        $recipeCount = $user->recipes()->count();
        $recipes = $user->recipes;

        return Inertia::render('Profile/Show', [
            'user' => $user,
            'recipes' => $recipes,
            'isOwnProfile' => $isOwnProfile,
            'followers' => $followers,
            'following' => $following,
            'isFollowing' => $isFollowing,
            'followersCount' => count($followers),
            'recipeCount' => $recipeCount,
        ]);
    }
    public function showRecipes($username)
    {
        $user = User::where('name', $username)->firstOrFail();
        $recipes = $user->recipes; // Assuming you have a relationship defined in the User model
        return response()->json(['recipes' => $recipes]);
    }


    public function search(Request $request) {
        $query = $request->input('q');
        $users = User::where('name', 'LIKE', "%{$query}%")->get();
        return response()->json($users);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit', $request->user()->id);
    }

    public function updateProfile(Request $request){
        $user = Auth::user();

        if ($request->user()->id !== $user->id){
            return redirect()->back();
        }

        $request->validate([
            'profile_image' => 'image|mimes:jpeg,png,jpg|max:2048',
            'cover_image' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('profile_image')){
            //Delete old profile image from storage
            if($user->profile_image_url){
                Storage::disk('spaces')->delete(parse_url($user->profile_image_url, PHP_URL_PATH));
            }
            $profileImagePath = $this->uploadImage($request->file('profile_image'), "user_{$user->id}/profile_assets/profile_images/avi");
            $user->profile_image_url = $profileImagePath;
        }

        if ($request->hasFile('cover_image')) {
            // Delete old cover image from storage
            if ($user->cover_image_url) {
                Storage::disk('spaces')->delete(parse_url($user->cover_image_url, PHP_URL_PATH));
            }

            $coverImagePath = $this->uploadImage($request->file('cover_image'), "user_{$user->id}/profile_assets/profile_images/profile_cover");
            $user->cover_image_url = $coverImagePath;
        }

        $user->save();
        return redirect()->back();
    }

    protected function uploadImage($image, $path){

        // Initialize ImageManager with driver
        $manager = new ImageManager(new Driver());
        $imageName = $image->hashName();
        $resizedImage = $manager->read($image->getPathname())->resize(800, 600)->toJpg(75);

        Storage::disk('spaces')->put("images/user_uploads/{$path}/{$imageName}", (string) $resizedImage, 'public');
        return Storage::disk('spaces')->url("images/user_uploads/{$path}/{$imageName}");
    }

    public function updateAllergens(Request $request){
        $user = Auth::user();

        if($request->user()->id !== $user->id){
            return redirect()->back();
        }
        $allergens = $request->input('allergens', []);

        //save allergens as lowercase for consistency

        $allergens = array_map('strtolower', $allergens);

        $user->allergens = $allergens;
        $user->save();

        return response()->json(['allergens' => $user->allergens]);
    }

    public function updateBio(Request $request){
        $request->validate([
            'bio' => 'string|max:500'
        ]);

        $user = Auth::user();
        $user->bio = $request->input('bio');
        $user->save();
        return response()->json(['success' => true]);
    }

    public function follow($username) {
        $user = User::where('name', $username)->firstOrFail();
        $authUser = auth()->user();

        if(!$authUser->following()->where('following_user_id', $user->id)->exists()){
            $authUser->following()->attach($user->id);
        }
        return redirect()->back();
    }

    public function unfollow($username) {
        $user = User::where('name', $username)->firstOrFail();
        $authUser = auth()->user();
        if($authUser->following()->where('following_user_id', $user->id)->exists()){
            $authUser->following()->detach($user->id);
        }
        return redirect()->back();
    }

    public function getFollowers(User $user) {
        $followers = $user->followers()->get();
        return response()->json(['followers' => $followers]);
    }
    public function getFollowing(User $user) {
        $following = $user->following()->get();
        return response()->json(['following' => $following]);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
