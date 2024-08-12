<?php

    use App\Models\Recipe;
    use App\Models\User;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Broadcast;


    Broadcast::channel('recipes', function($user) {
        return Auth::check();
    });

