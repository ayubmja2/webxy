<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
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
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
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

        return Redirect::route('profile.edit');
    }

    public function updateProfile(Request $request){
        $user = Auth::user();

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

//        if ($request->hasFile('profile_image')) {
//            $profileImage = $request->file('profile_image');
//            $profileImagePath = $this->uploadImage($profileImage, "user_{$user->id}/profile_assets/profile_images/avi");
//            $user->profile_image_url = $profileImagePath;
//        }
//
//        if ($request->hasFile('cover_image')) {
//            $coverImage = $request->file('cover_image');
//            $coverImagePath = $this->uploadImage($coverImage, "user_{$user->id}/profile_assets/profile_images/profile_cover");
//            $user->cover_image_url = $coverImagePath;
//        }

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
        $allergens = $request->input('allergens', []);

        //save allergens as lowercase for consistency

        $allergens = array_map('strtolower', $allergens);

        $user->allergens = $allergens;
        $user->save();

        return response()->json(['allergens' => $user->allergens]);
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
