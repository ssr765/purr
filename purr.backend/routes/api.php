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

// ----- V1 API
Route::prefix('v1')->group(function () {
    // --- Requires authentication
    Route::middleware(['auth:sanctum'])->group(function () {
        // Actual user data
        Route::get('/user', function (Request $request) {
            return response()->json(new V1UserResource($request->user()->load('cats')));
        })->name('user.show');

        // User utilities
        Route::prefix('user')->name('user.')->group(function () {
            Route::post('/username', [V1UserController::class, 'checkUsername'])->name('checkUsername');
            Route::post('/email', [V1UserController::class, 'checkEmail'])->name('checkEmail');
            Route::get('/cats', [V1UserController::class, 'showCats'])->name('cats');
        });

        // CRUD resources
        Route::apiResource('users', V1UserController::class)->only(['destroy']);
        Route::apiResource('cats', V1CatController::class)->only(['store', 'destroy']);
        Route::apiResource('posts', V1PostController::class)->only(['store']);
        Route::apiResource('comments', V1CommentController::class)->only(['store', 'destroy']);

        // Cat routes
        Route::post('cats/catname', [V1CatController::class, 'checkCatname'])->name('cats.checkCatname');
        Route::get('cats/catname/{catname}', [V1CatController::class, 'showByCatname'])->name('cats.showByCatname');

        // Post routes
        Route::prefix('posts')->name('posts.')->group(function () {
            Route::get('/{post}/media', [V1PostController::class, 'showContent'])->name('content');
            Route::get('/{post}/media/download', [V1PostController::class, 'download'])->name('download');
            Route::post('/{post}/likes', [V1PostLikeController::class, 'store'])->name('likes.store');
            Route::delete('/{post}/likes', [V1PostLikeController::class, 'destroy'])->name('likes.destroy');
        });

        // Comment replies & likes routes
        Route::prefix('comments')->name('comments.')->group(function () {
            Route::post('/{comment}', [V1CommentController::class, 'storeReply'])->name('replies.store');
            Route::post('/{comment}/likes', [V1CommentLikeController::class, 'store'])->name('likes.store');
            Route::delete('/{comment}/likes', [V1CommentLikeController::class, 'destroy'])->name('likes.destroy');
        });
    });

    // --- No authentication required
    // Show resources
    Route::apiResource('users', V1UserController::class)->only(['show']);
    Route::apiResource('cats', V1CatController::class)->only(['show']);
    Route::apiResource('posts', V1PostController::class)->only(['index', 'show']);
    Route::apiResource('comments', V1CommentController::class)->only(['show']);

    // Cat routes
    Route::prefix('cats')->name('cats.')->group(function () {
        Route::get('/random', [V1CatController::class, 'random'])->name('random');
        Route::get('/{cat}/avatar', [V1CatController::class, 'avatar'])->name('avatar');
    });
});
