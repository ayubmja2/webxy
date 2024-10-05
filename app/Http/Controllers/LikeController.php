<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function likeRecipe(Request $request, $recipeId){
        $user = auth()->user();

        //check if the user has already liked the recipe
        if($user->likedRecipes()->where('recipe_id', $recipeId)->exists()){
            return response()->json(['message' => 'Recipe already liked'], 400);
        }

        $user->likedRecipes()->attach($recipeId);
        return response()->json(['message' => 'Recipe liked successfully']);
    }

    public function toggleLike(Recipe $recipe){
        $user = auth()->user();

        //toggle the like on or off
        $user->likedRecipes()->toggle($recipe->id);
        return response()->json(['success' => true, 'likes_count' => $recipe->likes()->count()]);
    }
}
