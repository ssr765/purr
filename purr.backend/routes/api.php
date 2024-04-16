<?php

use App\Http\Controllers\Api\V1\CatController as V1CatController;
use App\Http\Controllers\Api\V1\PostController as V1PostController;
use App\Http\Controllers\Api\V1\UserController as V1UserController;
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
    Route::apiResource('cats', V1CatController::class)->only(['show']);
    Route::middleware(['auth:sanctum'])->apiResource('cats', V1CatController::class)->only(['store', 'destroy']);

    // Posts
    Route::apiResource('posts', V1PostController::class)->only(['index', 'show']);
    Route::middleware(['auth:sanctum'])->apiResource('posts', V1PostController::class)->only(['store']);

    Route::prefix('posts')->name('posts.')->group(function () {
        Route::get('/{post}/media', [V1PostController::class, 'showContent'])->name('content');
    });
});
