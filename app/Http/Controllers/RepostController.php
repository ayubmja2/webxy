<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;

class RepostController extends Controller
{
    public function toggleRepost(Request $request, Recipe $recipe)
    {
        $user = $request->user();

        // Check if the user has already reposted this recipe
        $existingRepost = Recipe::where('user_id', $user->id)
            ->where('repost_id', $recipe->id)
            ->first();

        if ($existingRepost) {
            // If repost exists, delete it (undo repost)
            $existingRepost->delete();
            $reposted = false;
        } else {
            // Create a new repost instance (repost)
            $repost = new Recipe();
            $repost->user_id = $user->id;  // The user who is reposting
            $repost->title = $recipe->title;
            $repost->description = $recipe->description;
            $repost->instruction = $recipe->instruction;
            $repost->image_url = $recipe->image_url;
            $repost->repost_id = $recipe->id;  // Link to the original recipe

            $repost->save();
            $reposted = true;
        }

        // Return response with success and repost status
        return response()->json(['success' => true, 'reposted' => $reposted]);
    }
}
