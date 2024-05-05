<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'cat_id',
        'filename',
        'caption',
        'type',
        'detected',
    ];

    public function cat()
    {
        return $this->belongsTo(Cat::class);
    }

    public function likes()
    {
        return $this->hasMany(PostLike::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function likedByUser(User $user)
    {
        return $this->likes->contains('user_id', $user->id);
    }

    public function saves()
    {
        return $this->hasMany(Save::class);
    }

    public function savedByUser(User $user)
    {
        return $this->saves->contains('user_id', $user->id);
    }
}
