<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CookBookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        //fetch user categories
        $categories = Category::where('user_id',$user->id)->with('recipes')->get();

        //fetch user recipes
        $recipes = Recipe::where('user_id', $user->id)->get();

        //fetch uncategorized bookmarks
        $uncategorizedBookmarks = $user->bookmarkedRecipes()->whereDoesntHave('categories')->get();

        return Inertia::render('CookBook/Index', [
            'categories' => $categories,
            'recipes' => $recipes,
            'uncategorizedBookmarks' => $uncategorizedBookmarks,
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
