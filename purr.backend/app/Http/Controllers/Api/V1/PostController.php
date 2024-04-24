<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\V1\PostResource;
use App\Models\Cat;
use App\Services\ImageEngineService;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all posts with their cats.
        $posts = Post::with(['comments' => function ($query) {
            $query->latest()->take(3);
        }])->get();
        return response()->json(PostResource::collection($posts->load('cat')));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request, ImageEngineService $imageEngineService)
    {
        $cat = Cat::find($request->cat_id);

        // Check if the user owns the cat before uploading a post with the cat.
        if ($cat->users()->where('user_id', auth()->id())->doesntExist()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $file = $request->file('file')->store('', 'posts');

        $file = $imageEngineService->optimizeImage(storage_path('app/posts/' . $file));

        $post = Post::create([
            'cat_id' => $request->cat_id,
            'filename' => $file,
            'caption' => $request->caption,
            'type' => $request->type,
        ]);

        return response()->json(new PostResource($post), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        // Get the post with its cat.
        $post = $post->load('cat')->load('comments');
        return response()->json(new PostResource($post));
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
