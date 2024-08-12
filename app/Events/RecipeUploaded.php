<?php

namespace App\Events;

use App\Models\Recipe;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class RecipeUploaded implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     * @var Recipe
     */
    public $recipe;

    public function __construct($recipe)
    {
        $this->recipe = $recipe;
    }

    public function broadcastOn(): Channel {
       return new PrivateChannel('recipes');
    }

}
