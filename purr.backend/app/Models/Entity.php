<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entity extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'dni',
        'slug',
        'description',
        'type',
        'webpage',
        'location',
        'phone',
        'user_id',
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'entity_id');
    }
}
