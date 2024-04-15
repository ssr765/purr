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
    ];

    public function cat()
    {
        return $this->belongsTo(Cat::class);
    }
}
