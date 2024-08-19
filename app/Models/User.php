<?php

    namespace App\Models;

    // use Illuminate\Contracts\Auth\MustVerifyEmail;

    use Illuminate\Contracts\Auth\MustVerifyEmail;
    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Relations\BelongsToMany;
    use Illuminate\Foundation\Auth\User as Authenticatable;
    use Illuminate\Notifications\Notifiable;
    use Illuminate\Support\Facades\Log;
    use Illuminate\Support\Facades\Storage;

    class User extends Authenticatable implements MustVerifyEmail
    {
        use HasFactory, Notifiable;

        /**
         * The attributes that are mass assignable.
         *
         * @var array<int, string>
         */
        protected $fillable = [
            'name',
            'email',
            'password',
            'profile_image_url',
            'cover_image_url',
        ];

        /**
         * The attributes that should be hidden for serialization.
         *
         * @var array<int, string>
         */
        protected $hidden = [
            'password',
            'remember_token',
        ];

        /**
         * Get the attributes that should be cast.
         *
         * @return array<string, string>
         */
        protected function casts(): array
        {
            return [
                'email_verified_at' => 'datetime',
                'allergens' => 'array',
                'password' => 'hashed',
            ];
        }

        public function getProfileImageUrlAttribute()
        {
            return $this->attributes['profile_image_url'] ?? '/images/placeholders/profile_placeholder.png';
        }

        public function getCoverImageUrlAttribute()
        {
            return $this->attributes['cover_image_url'] ?? '/images/placeholders/cover_placeholder.png';
        }
        public function recipes(){
            return $this->hasMany(Recipe::class);
        }

        public function categories(){
            return $this->hasMany(Category::class);
        }

        public function bookmarkedRecipes(){
            return $this->belongsToMany(Recipe::class, 'recipe_user')->withTimestamps();
        }

        public function followers(): BelongsToMany {
            return $this->belongsToMany(User::class, 'followers', 'following_user_id', 'follower_user_id')->withTimestamps();
        }

        public function following(): BelongsToMany {
            return $this->belongsToMany(User::class, 'followers', 'follower_user_id', 'following_user_id')->withTimestamps();
        }

        public function follow(User $user){
            return $this->following()->attach($user);
        }

        public function unfollow(User $user){
            return $this->following()->detach($user);
        }

        public function isFollowing(User $user){
            return $this->following()->where('follow_id', $user->id)->exists();
        }

        public function likes()
        {
            return $this->belongsToMany(Recipe::class, 'likes');
        }

        public function reposts()
        {
            return $this->belongsToMany(Recipe::class, 'reposts');
        }

        public function like(Recipe $recipe)
        {
            return $this->likes()->attach($recipe);
        }

        public function unlike(Recipe $recipe)
        {
            return $this->likes()->detach($recipe);
        }

        public function hasLiked(Recipe $recipe)
        {
            return $this->likes()->where('recipe_id', $recipe->id)->exists();
        }

        public function repost(Recipe $recipe)
        {
            return $this->reposts()->attach($recipe);
        }

        public function hasReposted(Recipe $recipe)
        {
            return $this->reposts()->where('recipe_id', $recipe->id)->exists();
        }

        public static function boot() {
            parent::boot();

            static::deleting(function( User $user) {
                $user->deleteUserFiles();
            });
        }

        public function deleteUserFiles() {
            $folderPath = 'images/user_uploads/user_' . $this->id;
            try {
                Storage::disk('spaces')->deleteDirectory($folderPath);
            }catch (\Exception $e){
                Log::error('Failed to delete user folder:');
            }
        }
    }
