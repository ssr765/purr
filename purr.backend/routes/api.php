<?php

use App\Http\Controllers\AdminController;
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
    // 100 requests per minute
    Route::middleware(['throttle:100,1'])->group(function () {
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
                Route::get('/feed', [V1UserController::class, 'feed'])->name('feed');
            });

            // CRUD resources
            Route::apiResource('users', V1UserController::class)->only(['update', 'destroy'])->where(['user' => '\d+']);
            Route::apiResource('cats', V1CatController::class)->only(['update', 'store', 'destroy'])->where(['cat' => '\d+']);
            Route::apiResource('posts', V1PostController::class)->only(['store', 'destroy'])->where(['post' => '\d+']);
            Route::apiResource('entities', V1EntityController::class)->only(['store'])->where(['entity' => '\d+']);
            Route::apiResource('comments', V1CommentController::class)->only(['store', 'destroy'])->where(['comment' => '\d+']);

            // Users routes
            Route::prefix('users')->name('users.')->group(function () {
                Route::post('/{user}/avatar', [V1UserController::class, 'updateAvatar'])->name('avatar.update');
                Route::delete('/{user}/avatar', [V1UserController::class, 'deleteAvatar'])->name('avatar.delete');
            });

            // Cat routes
            Route::prefix('cats')->name('cats.')->group(function () {
                Route::post('/catname', [V1CatController::class, 'checkCatname'])->name('checkCatname');
                Route::get('/catname/{catname}', [V1CatController::class, 'showByCatname'])->name('showByCatname')->where(['catname' => '[\w\d\.]{3,30}']);
                Route::post('/catname/{catname}/share', [V1CatController::class, 'share'])->name('share')->where(['catname' => '[\w\d\.]{3,30}']);
                Route::get('/random', [V1CatController::class, 'random'])->name('random');

                Route::post('/{cat}/follow', [V1CatController::class, 'follow'])->name('follow');
                Route::delete('/{cat}/follow', [V1CatController::class, 'unfollow'])->name('unfollow');
            });

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

        // Users routes
        Route::prefix('users')->name('users.')->group(function () {
            Route::get('/{user}/cats', [V1UserController::class, 'showCats'])->name('cats');
            Route::get('/{user}/following', [V1UserController::class, 'following'])->name('following');
        });

        // Cat routes
        Route::prefix('cats')->name('cats.')->group(function () {
            Route::get('/catname/{catname}', [V1CatController::class, 'showByCatname'])->name('showByCatname')->where(['catname' => '[\w\d\.]{3,30}']);
            Route::get('/random', [V1CatController::class, 'random'])->name('random');
            Route::get('/{cat}/followers', [V1CatController::class, 'followers'])->name('followers');
        });
    });

    // --- No authentication required
    // 200 requests per minute
    Route::middleware(['throttle:200,1'])->group(function () {
        // Users routes
        Route::prefix('users')->name('users.')->group(function () {
            Route::get('/{user}/avatar', [V1UserController::class, 'avatar'])->name('avatar');
        });

        // Cat routes
        Route::prefix('cats')->name('cats.')->group(function () {
            Route::get('/{cat}/avatar', [V1CatController::class, 'avatar'])->name('avatar');
        });

        // Post routes
        Route::prefix('posts')->name('posts.')->group(function () {
            Route::get('/{post}/media', [V1PostController::class, 'showContent'])->name('content');
            Route::get('/{post}/comments', [V1CommentController::class, 'index'])->name('comments');
        });
    });

    // --- Admin routes
    Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::prefix('posts')->name('posts.')->group(function () {
            Route::post('/{post}/approve', [AdminController::class, 'approve'])->name('approve');
            Route::delete('/{post}/user', [AdminController::class, 'deleteUserOfPost'])->name('deleteUserOfPost');
        });

        Route::prefix('cats')->name('cats.')->group(function () {
            Route::delete('/{cat}/users', [AdminController::class, 'deleteUsersOfCat'])->name('deleteUsersOfCat');
        });
    });
});
