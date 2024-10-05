<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;

class RepostController extends Controller
{
    public function repost(Request $request, Recipe $recipe)
    {
        $user = $request->user();

        // Create a new repost instance
        $repost = new Recipe();

        // Assign fields from the original recipe to the repost
        $repost->user_id = $user->id;  // The user who is reposting
        $repost->title = $recipe->title;
        $repost->description = $recipe->description;
        $repost->instruction = $recipe->instruction;

        // Copy image_url from original if it exists
        if (!empty($recipe->image_url)) {
            $repost->image_url = $recipe->image_url;
        }

        $repost->repost_id = $recipe->id;  // Link to the original recipe

        // Save the repost
        $repost->save();

        return response()->json(['success' => true]);
    }
}
