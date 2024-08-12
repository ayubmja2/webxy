<?php

    use App\Http\Controllers\CategoryController;
    use App\Http\Controllers\CookBookController;
    use App\Http\Controllers\ProfileController;
    use App\Http\Controllers\RecipeController;
    use Illuminate\Foundation\Application;
    use Illuminate\Support\Facades\Route;
    use Inertia\Inertia;

    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    });

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::post('/profile/update', [ProfileController::class, 'updateProfile']);
        route::post('/profile/update-allergens', [profileController::class, 'updateAllergens'])->name('profile.update-allergens');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::post('/profile/{user}/follow', [ProfileController::class, 'follow'])->name('profile.follow');
        Route::post('/profile/{user}/unfollow', [ProfileController::class, 'unfollow'])->name('profile.unfollow');
        Route::get('/profile/{user}', [ProfileController::class, 'show'])->name('profile.show');
        Route::post('profile/update-bio', [ProfileController::class, 'updateBio'])->name('profile.update-bio');
        Route::get('/profile/{user}/followers', [ProfileController::class, 'getFollowers'])->name('profile.followers');


        // Category Routes
        Route::get('/categories/{category}', [CategoryController::class, 'index'])->name('categories.index');
        Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');
        Route::post('/categories/{category}/bookmarks', [CookBookController::class, 'storeBookmark'])->name('categories.storeBookmark');
        Route::patch('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
        Route::delete('/categories/{category}/recipes/{recipe}', [CategoryController::class, 'removeRecipe']);

        // Recipe Routes
        Route::get('/recipes', [RecipeController::class, 'index'])->name('recipes.index');
        Route::get('/recipes/create', [RecipeController::class, 'create'])->name('recipes.create');
        Route::post('/recipes', [RecipeController::class, 'store'])->name('recipes.store');
        Route::get('/recipes/{recipe}', [RecipeController::class, 'show'])->name('recipes.show');
        Route::get('/recipes/{recipe}/edit', [RecipeController::class, 'edit'])->name('recipes.edit');
        Route::patch('/recipes/{recipe}', [RecipeController::class, 'update'])->name('recipes.update');
        Route::delete('/recipes/{recipe}', [RecipeController::class, 'destroy'])->name('recipes.destroy');

        //post
        Route::post('/recipe/{recipe}/like', [RecipeController::class, 'like'])->name('recipes.like');
        Route::post('/recipe/{recipe}/repost', [RecipeController::class, 'repost'])->name('recipes.repost');

        //Bookmark Routes
        Route::post('/recipes/{recipe}/bookmark', [RecipeController::class, 'bookmark']);
        // CookBook Routes
        Route::get('/cookbook', [CookBookController::class, 'index'])->name('cookbook.index');
        Route::post('/cookbook', [CookBookController::class, 'store'])->name('cookbook.store');
        Route::delete('/cookbook/{recipe}', [CookBookController::class, 'destroy'])->name('cookbook.destroy');

        // Search
        Route::get('search', [RecipeController::class, 'search'])->name('recipes.search');
        Route::get('/search/users', [ProfileController::class, 'search'])->name('users.search');

        //Fetch unread notifications
        Route::get('/api/notifications/unread', function(){
            return auth()->user()->unreadNotifications;
        });
        Route::post('/api/notifications/read', function(){
            return auth()->user()->unreadNotifications->markAsRead();
        });
    });

//    // Fetch unread notifications
//    Route::get('/api/notifications/unread', function(){
//        return auth()->user()->unreadNotifications;
//    });
//
//// Mark all notifications as read
//    Route::post('/api/notifications/read', function(){
//        auth()->user()->unreadNotifications->markAsRead();
//        return response()->json(['status' => 'success']);
//    });

    require __DIR__ . '/auth.php';
