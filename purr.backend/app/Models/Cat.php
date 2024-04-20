<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cat extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'catname',
        'sex',
        'breed',
        'color',
        'avatar',
        'biography',
        'birthdate',
        'deathdate',
        'password',
    ];

    public function setCatnameAttribute($value)
    {
        $this->attributes['catname'] = strtolower($value);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
