<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostLikeRequest;
use App\Http\Requests\UpdatePostLikeRequest;
use App\Models\Post;
use App\Models\PostLike;

class PostLikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostLikeRequest $request, Post $post)
    {
        $user = request()->user();

        $like = PostLike::where('user_id', $user->id)
            ->where('post_id', $post->id)
            ->first();

        // Check if the user has already liked the post.
        if ($like) {
            return response()->json(['message' => 'Post already liked'], 409);
        }

        // Create a new like.
        $post->likes()->create([
            'user_id' => $user->id,
        ]);
        $post->increment('likes_count');

        return response()->json(null, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(PostLike $postLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostLikeRequest $request, PostLike $postLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PostLike $like, Post $post)
    {
        $like->delete();
        $post->decrement('likes_count');
        return response()->json(null, 204);
    }
}
