<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\V1\CommentResource;
use App\Models\Comment;
use App\Models\Post;

class CommentController extends Controller
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
    public function store(StoreCommentRequest $request)
    {
        $post = Post::findOrFail($request->post_id);
        $post->increment('comments_count');
        $user = $request->user();

        $comment = $post->comments()->create([
            'user_id' => $user->id,
            'content' => $request->content,
        ]);

        return response()->json(new CommentResource($comment), 201);
    }
    public function storeReply(StoreCommentRequest $request, Comment $comment)
    {
        $post = Post::findOrFail($request->post_id);
        $post->increment('comments_count');
        $user = $request->user();

        $reply = $post->comments()->create([
            'parent_id' => $comment->id,
            'user_id' => $user->id,
            'content' => $request->content,
        ]);

        return response()->json(new CommentResource($reply), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        return response()->json(new CommentResource($comment));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();
        return response()->json(null, 204);
    }
}
