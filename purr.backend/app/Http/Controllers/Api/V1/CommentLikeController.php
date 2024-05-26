<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentLikeRequest;
use App\Http\Requests\UpdateCommentLikeRequest;
use App\Models\Comment;
use App\Models\CommentLike;

class CommentLikeController extends Controller
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
    public function store(StoreCommentLikeRequest $request, Comment $comment)
    {
        $user = $request->user();

        $like = CommentLike::where('user_id', $user->id)
            ->where('comment_id', $comment->id)
            ->first();

        // Check if the user has already liked the post.
        if ($like) {
            return response()->json([
                "isLiked" => $comment->likedByUser($user),
                "count" => $comment->likes_count,
            ], 409);
        }

        // Create a new like.
        $comment->likes()->create([
            'user_id' => $user->id,
        ]);

        $comment->increment('likes_count');

        return response()->json([
            "isLiked" => true,
            "count" => $comment->likes_count,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(CommentLike $commentLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentLikeRequest $request, CommentLike $commentLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $user = request()->user();
        $like = CommentLike::where('user_id', $user->id)
            ->where('comment_id', $comment->id)
            ->first();

        if (!$like) {
            return response()->json([
                "isLiked" => $comment->likedByUser($user),
                "count" => $comment->likes_count,
            ], 409);
        }

        $like->delete();
        $comment->decrement('likes_count');

        return response()->json([
            "isLiked" => false,
            "count" => $comment->likes_count,
        ], 200);
    }
}
