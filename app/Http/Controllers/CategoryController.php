<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Category $category)
    {
        $user = Auth::user();

        $category->load(['recipes' => function ($query)  use ($user) {
            $query->wherePivot('user_id', $user->id);
        }]);

//        $categoryRecipe = $category->recipes()->wherePivot('user_id', $user->id)->get();
        return Inertia::render('Category/Index', [
            'category' => $category,
            'recipes' => $category->recipes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Category $category)
    {
        $user = Auth::user();
        $recipeId = $request->input('bookmarkId');

        //Attach the recipe to the category for the authenticated user
        $category->recipes()->attach($recipeId, ['user_id' => $user->id]);


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    public function getAllCategories(){
        $categories = Category::all();
        return response()->json($categories);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $user = Auth::user();
        if($category->user_id !== $user->id){
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $category->title = $request->input('title');
        $category->save();
        Log::info('category updated', ['category' => $category]);

        return response()->json(['success' => true, 'category' => $category]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->recipes()->detach(); // remove all recipes from this category
        $category->delete();


        return response()->json(['success' => true]);
    }
    public function removeRecipe(Category $category, Recipe $recipe){
        $user = Auth::user();

        $category->recipes()->wherePivot('user_id', $user->id)->detach($recipe->id);

        return response()->json(['success' => true]);
    }
}
