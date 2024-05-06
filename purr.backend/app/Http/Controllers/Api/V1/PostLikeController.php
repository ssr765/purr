<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostLikeRequest;
use App\Http\Requests\UpdatePostLikeRequest;
use App\Http\Resources\V1\PostResource;
use App\Models\Post;
use App\Models\PostLike;

class PostLikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = request()->user();

        // Get the posts liked by the user.
        $posts = Post::whereHas('likes', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with(['comments' => function ($query) {
            $query->latest()->take(3);
        }])->get();

        return response()->json(PostResource::collection($posts->load('cat')));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostLikeRequest $request, Post $post)
    {
        $user = $request->user();

        $like = PostLike::where('user_id', $user->id)
            ->where('post_id', $post->id)
            ->first();

        // Check if the user has already liked the post.
        if ($like) {
            return response()->json([
                "isLiked" => $post->likedByUser($user),
                "count" => $post->likes_count,
            ], 409);
        }

        // Create a new like.
        $post->likes()->create([
            'user_id' => $user->id,
        ]);
        $post->increment('likes_count');

        return response()->json([
            "isLiked" => true,
            "count" => $post->likes_count,
        ], 201);
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
    public function destroy(Post $post)
    {
        $user = request()->user();

        $like = PostLike::where('user_id', $user->id)
            ->where('post_id', $post->id)
            ->first();

        if (!$like) {
            return response()->json([
                "isLiked" => $post->likedByUser($user),
                "count" => $post->likes_count,
            ], 409);
        }

        $like->delete();
        $post->decrement('likes_count');

        return response()->json([
            "isLiked" => false,
            "count" => $post->likes_count,
        ]);
    }
}
