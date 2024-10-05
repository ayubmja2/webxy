<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Support\Facades\Storage;
    use Intervention\Image\ImageManager;
    use Intervention\Image\Drivers\Gd\Driver;
    class Recipe extends Model
    {
        use HasFactory;


        protected $fillable = ['user_id', 'title', 'description', 'instruction', 'image_url'];

        public function user(){
            return $this->belongsTo(User::class);
        }

        public function ingredients(){
            return $this->belongsToMany(Ingredient::class, 'ingredient_recipe')->withPivot('quantity', 'unit');
        }
        public function categories(){
            return $this->belongsToMany(Category::class, 'category_recipe')->withPivot('user_id')->withTimestamps();
        }

        public function bookmarkedByUsers()
        {
            return $this->belongsToMany(User::class, 'recipe_user')->withTimestamps();
        }

        public function setImageUrlAttribute($value){
            if($value){
                $user_id = $this->user_id;

                $manager = new ImageManager(new Driver());
                $resizedImage = $manager->read($value->getPathname())->resize(600,600)->toJpg(75);
                // Store the file and set the URL using the configured filesystem
                $path = "images/user_uploads/user_{$user_id}/recipe_images/{$value->hashName()}";
                Storage::disk('spaces')->put($path, (string) $resizedImage,'public');
                $this->attributes['image_url'] = Storage::disk('spaces')->url($path);
            }else {
                $this->attributes['image_url'] = null;
            }
        }
        public function likedByUsers(){
            return $this->belongsToMany(User::class, 'likes')->withTimestamps();
        }
        public function likes(){
            return $this->belongsToMany(User::class, 'likes', 'recipe_id', 'user_id')->withTimestamps();
        }
    }
