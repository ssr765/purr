<?php

use App\Http\Controllers\Api\V1\CatController as V1CatController;
use App\Http\Controllers\Api\V1\PostController as V1PostController;
use App\Http\Controllers\Api\V1\UserController as V1UserController;
use App\Http\Controllers\Api\V1\PostLikeController as V1PostLikeController;
use App\Http\Controllers\Api\V1\CommentController as V1CommentController;
use App\Http\Controllers\Api\V1\CommentLikeController as V1CommentLikeController;
use App\Http\Resources\V1\UserResource as V1UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// V1 API
Route::prefix('v1')->group(function () {
    Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
        return response()->json(new V1UserResource($request->user()->load('cats')));
    });

    Route::apiResource('users', V1UserController::class)->only(['show']);
    Route::prefix('cats')->name('cats.')->group(function () {
        Route::get('/random', [V1CatController::class, 'random'])->name('random');
        Route::get('/{cat}/avatar', [V1CatController::class, 'avatar'])->name('avatar');
    });
    Route::apiResource('cats', V1CatController::class)->only(['show']);
    Route::middleware(['auth:sanctum'])->apiResource('cats', V1CatController::class)->only(['store', 'destroy']);
    Route::post('cats/catname', [V1CatController::class, 'checkCatname'])->name('cats.checkCatname');
    Route::get('cats/catname/{catname}', [V1CatController::class, 'showByCatname'])->name('cats.showByCatname');

    // Posts
    Route::apiResource('posts', V1PostController::class)->only(['index', 'show']);
    Route::middleware(['auth:sanctum'])->apiResource('posts', V1PostController::class)->only(['store']);

    Route::prefix('posts')->name('posts.')->group(function () {
        Route::get('/{post}/media', [V1PostController::class, 'showContent'])->name('content');
        Route::middleware(['auth:sanctum'])->post('/{post}/likes', [V1PostLikeController::class, 'store'])->name('likes.store');
        Route::middleware(['auth:sanctum'])->delete('/{post}/likes', [V1PostLikeController::class, 'destroy'])->name('likes.destroy');
    });


    Route::middleware(['auth:sanctum'])->apiResource('comments', V1CommentController::class)->only(['show', 'store', 'destroy']);
    // Comments
    Route::middleware(['auth:sanctum'])->prefix('comments')->name('comments.')->group(function () {
        Route::post('/{comment}', [V1CommentController::class, 'storeReply'])->name('replies.store');
        Route::post('/{comment}/likes', [V1CommentLikeController::class, 'store'])->name('likes.store');
        Route::delete('/{comment}/likes', [V1CommentLikeController::class, 'destroy'])->name('likes.destroy');
    });
});
