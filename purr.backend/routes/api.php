<?php

use App\Http\Controllers\Api\V1\CatController as V1CatController;
use App\Http\Controllers\Api\V1\PostController as V1PostController;
use App\Http\Controllers\Api\V1\UserController as V1UserController;
use App\Http\Controllers\Api\V1\PostLikeController as V1PostLikeController;
use App\Http\Controllers\Api\V1\CommentController as V1CommentController;
use App\Http\Controllers\Api\V1\CommentLikeController as V1CommentLikeController;
use App\Http\Controllers\Api\V1\SaveController as V1SaveController;
use App\Http\Controllers\Api\V1\EntityController as V1EntityController;
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
        Route::apiResource('users', V1UserController::class)->only(['update', 'destroy'])->where(['user' => '\d+']);
        Route::apiResource('cats', V1CatController::class)->only(['store', 'destroy'])->where(['cat' => '\d+']);
        Route::apiResource('posts', V1PostController::class)->only(['store'])->where(['post' => '\d+']);
        Route::apiResource('entities', V1EntityController::class)->only(['store'])->where(['entity' => '\d+']);
        Route::apiResource('comments', V1CommentController::class)->only(['store', 'destroy'])->where(['comment' => '\d+']);

        // Users routes
        Route::prefix('users')->name('users.')->group(function () {
            Route::get('/{user}/avatar', [V1UserController::class, 'avatar'])->name('avatar');
            Route::put('/{user}/avatar', [V1UserController::class, 'updateAvatar'])->name('avatar.update');
        });

        // Cat routes
        Route::post('cats/catname', [V1CatController::class, 'checkCatname'])->name('cats.checkCatname');

        // Post routes
        Route::prefix('posts')->name('posts.')->group(function () {
            Route::get('/{post}/media/download', [V1PostController::class, 'download'])->name('download');
            Route::post('/{post}/likes', [V1PostLikeController::class, 'store'])->name('likes.store');
            Route::delete('/{post}/likes', [V1PostLikeController::class, 'destroy'])->name('likes.destroy');
            Route::post('/analyze', [V1PostController::class, 'analyze'])->name('analyze');
            Route::post('/{post}/saves', [V1SaveController::class, 'store'])->name('saves.store');
            Route::delete('/{post}/saves', [V1SaveController::class, 'destroy'])->name('saves.destroy');

            // User's saves & likes
            Route::get('/likes', [V1PostLikeController::class, 'index'])->name('likes.index');
            Route::get('/saves', [V1SaveController::class, 'index'])->name('saves.index');
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
    Route::apiResource('users', V1UserController::class)->only(['show'])->where(['user' => '\d+']);
    Route::apiResource('cats', V1CatController::class)->only(['show'])->where(['cat' => '\d+']);
    Route::apiResource('posts', V1PostController::class)->only(['index', 'show'])->where(['post' => '\d+']);
    Route::apiResource('comments', V1CommentController::class)->only(['show'])->where(['comment' => '\d+']);

    // Cat routes
    Route::prefix('cats')->name('cats.')->group(function () {
        Route::get('/catname/{catname}', [V1CatController::class, 'showByCatname'])->name('cats.showByCatname')->where(['catname' => '[\w\d\.]{3,30}']);
        Route::get('/random', [V1CatController::class, 'random'])->name('random');
        Route::get('/{cat}/avatar', [V1CatController::class, 'avatar'])->name('avatar');
    });

    Route::prefix('posts')->name('posts.')->group(function () {
        Route::get('/{post}/media', [V1PostController::class, 'showContent'])->name('content');
    });
});
