<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CookBookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        //fetch user categories
        $categories = $user->categories()->get();

        $bookmarkedRecipes = $user->bookmarkedRecipes()->whereDoesntHave('categories', function ($query) use ($user) {
            $query->where('category_recipe.user_id',$user->id);
        })->get();

//        dd($bookmarkedRecipes);
        //fetch user recipes
        $recipes = Recipe::where('user_id', $user->id)->get();

        return Inertia::render('CookBook/Index', [
            'categories' => $categories,
            'recipes' => $recipes,
            'bookmarkedRecipes' => $bookmarkedRecipes
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
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $category = new Category();
        $category->title = $request->title;
        $category->user_id = $request->user()->id;
        $category->save();

        return response()->json(['category' => $category], 201);
    }

    public function storeBookmark(Request $request, Category $category){
        $user = Auth::user();
        $recipeId = $request->input('bookmarkId');


        //Attach the recipe to the category for the authenticated user
        $category->recipes()->attach($recipeId, ['user_id' => $user->id]);

        return back();
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
