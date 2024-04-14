<?php

use App\Http\Controllers\Api\V1\CatController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Resources\V1\UserResource;
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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return response()->json(new UserResource($request->user()));
});

Route::apiResource('users', UserController::class)->only(['show']);
Route::apiResource('cats', CatController::class)->only(['show', 'store']);
Route::apiResource('posts', PostController::class)->only(['store', 'show']);

Route::prefix('posts')->name('posts.')->group(function () {
    Route::get('/{post}/image', [PostController::class, 'showContent'])->name('content');
});
