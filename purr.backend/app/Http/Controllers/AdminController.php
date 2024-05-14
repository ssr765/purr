<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function approve(Post $post)
    {
        $post->update([
            'detected' => true,
        ]);

        return response()->json(null, 204);
    }
}
