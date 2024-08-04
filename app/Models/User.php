<?php

    namespace App\Models;

    // use Illuminate\Contracts\Auth\MustVerifyEmail;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Foundation\Auth\User as Authenticatable;
    use Illuminate\Notifications\Notifiable;

    class User extends Authenticatable
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
        public function recipes(){
            return $this->hasMany(Recipe::class);
        }

        public function categories(){
            return $this->hasMany(Category::class);
        }

        public function bookmarkedRecipes(){
            return $this->belongsToMany(Recipe::class, 'recipe_user')->withTimestamps();
        }
    }
