<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Save;
use App\Http\Requests\StoreSaveRequest;
use App\Http\Requests\UpdateSaveRequest;
use App\Models\Post;

class SaveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = request()->user();

        // Get the posts liked by the user.
        $posts = Post::whereHas('saves', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->get();

        return response()->json($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSaveRequest $request, Post $post)
    {
        $user = $request->user();

        $like = Save::where('user_id', $user->id)
            ->where('post_id', $post->id)
            ->first();

        // Check if the user has already liked the post.
        if ($like) {
            return response()->json([
                "isSaved" => $post->savedByUser($user),
                "count" => $post->saves_count,
            ], 409);
        }

        // Create a new like.
        $post->likes()->create([
            'user_id' => $user->id,
        ]);
        $post->increment('saves_count');

        return response()->json([
            "isLiked" => true,
            "count" => $post->saves_count,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Save $save)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSaveRequest $request, Save $save)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $user = request()->user();

        $like = Save::where('user_id', $user->id)
            ->where('post_id', $post->id)
            ->first();

        if (!$like) {
            return response()->json([
                "isSaved" => $post->savedByUser($user),
                "count" => $post->saves_count,
            ], 409);
        }

        $like->delete();
        $post->decrement('saves_count');

        return response()->json([
            "isSaved" => false,
            "count" => $post->saves_count,
        ]);
    }
}
