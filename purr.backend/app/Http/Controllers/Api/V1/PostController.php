<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\V1\PostCollection;
use App\Http\Resources\V1\PostResource;
use App\Models\Cat;
use App\Services\ImageEngineService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get recent posts with their cats.
        $posts = Post::with(['comments' => function ($query) {
            $query->latest()->take(3);
        }, 'cat'])
            ->where('detected', true)
            ->latest()
            ->paginate(10);

        return response()->json(new PostCollection($posts));
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

        // Get the file and hash it.
        $file = $request->file('file');
        $hash = hash_file('sha256', $file);

        $detected = false;

        // Check if the image has been analyzed and got detections.
        if (!Redis::sismember('detections', $hash)) {
            // Re-analyze the image.
            $analysis = $imageEngineService->analyzeImage($file);

            $detected = $analysis['detected'];
            // if (!$analysis['detected']) {
            //     return response()->json(['message' => 'The image don\'t contains cats.'], 403);
            // }
        } else {
            $detected = true;
        }

        // Remove hash from the detections set.
        Redis::srem('detections', $hash);

        $optimizedFile = $imageEngineService->optimizeImage($file);
        $filename = Str::random(40) . '.webp';
        Storage::disk('posts')->put($filename, $optimizedFile);

        // Temporally disabled.
        // $file = $imageEngineService->optimizeImage(storage_path('app/posts/' . $file));

        $post = Post::create([
            'cat_id' => $request->cat_id,
            'user_id' => $request->user()->id,
            'filename' => $filename,
            'caption' => $request->caption,
            'type' => $request->type,
            'detected' => $detected,
        ]);

        $post->refresh();

        return response()->json(new PostResource($post->load('cat')), 201);
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
        // Check if the user owns the cat to delete it.
        if (request()->user()->cannot('delete', $post)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete the post.
        $post->delete();

        // Delete the file.
        $path = storage_path('app/posts/' . $post->filename);
        if (file_exists($path)) {
            unlink($path);
        }

        return response()->json(null, 204);
    }

    /**
     * Shows the content of the post.
     */
    public function showContent(Post $post)
    {
        $path = storage_path('app/posts/' . $post->filename);
        return response()->file($path);
    }

    public function download(Post $post)
    {
        $path = storage_path('app/posts/' . $post->filename);
        return response()->download($path);
    }

    public function analyze(Request $request, ImageEngineService $imageEngineService)
    {
        $request->validate([
            'file' => 'required|file'
        ]);

        // Get the file and hash it.
        $file = $request->file('file');
        $hash = hash_file('sha256', $file);

        // Analyze the image.
        $analysis = $imageEngineService->analyzeImage($file);

        // Save the hash if the image has detections, so we don't have to analyze it again at upload time.
        if ($analysis['detected']) {
            Redis::sadd('detections', $hash);
        }

        return response()->json($analysis);
    }
}
