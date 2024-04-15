<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\V1\ImageResource;
use App\Models\Cat;

class PostController extends Controller
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
    public function store(StorePostRequest $request)
    {
        $cat = Cat::find($request->cat_id);

        // Check if the user owns the cat before uploading a post with the cat.
        if ($cat->users()->where('user_id', auth()->id())->doesntExist()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post = Post::create([
            'cat_id' => $request->cat_id,
            'filename' => $request->file('file')->store('', 'posts'),
            'caption' => $request->caption,
            'type' => $request->type,
        ]);

        return response()->json(new ImageResource($post), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return response()->json(new ImageResource($post));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }

    /**
     * Shows the content of the post.
     */
    public function showContent(Post $post)
    {
        $path = storage_path('app/posts/' . $post->filename);
        return response()->file($path);
    }
}
