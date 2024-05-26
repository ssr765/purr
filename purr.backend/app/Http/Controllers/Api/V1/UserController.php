<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\EmailRateLimiter;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\CatCollection;
use App\Http\Resources\V1\PostCollection;
use App\Http\Resources\V1\UserCollection;
use App\Http\Resources\V1\UserEmailResource;
use App\Http\Resources\V1\UserResource;
use App\Mail\GoodbyeMail;
use App\Models\Post;
use App\Models\User;
use App\Rules\EmailValidator;
use App\Services\ImageEngineService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules;
use Illuminate\Support\Str;

class UserController extends Controller
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        // Validate the request.
        // 'username' => ['required', 'string', 'max:255', 'unique:' . User::class, 'regex:/^[\w\d\.]{3,30}$/', 'min:3', 'max:30', 'not_in:email,username'],
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'min:3', 'max:30', 'regex:/^[\w\d\.]{3,30}$/'],
            'email' => ['required', 'email', new EmailValidator, 'unique:' . User::class . ',email,' . $user->id],
            'password' => ['required', 'string'],
            'new_password' => ['nullable', 'string', 'confirmed', Rules\Password::min(8)->mixedCase()->letters()->numbers()->symbols()],
        ]);

        // Check if the user is authorized to update the account.
        if ($request->user()->id !== $user->id) {
            abort(403, 'Unauthorized');
        }

        // Check if the password is correct.
        if (!Hash::check($request->password, $user->password)) {
            abort(403, 'Unauthorized');
        }

        // Check if the email is already taken.
        if (User::where('email', $request->email)->where('id', '!=', $user->id)->exists()) {
            return response()->json([
                'errors' => [
                    'email' => ['The email has already been taken.']
                ]
            ], 409);
        }

        // Check if the username is already taken.
        if (User::where('username', $request->username)->where('id', '!=', $user->id)->exists()) {
            return response()->json([
                'errors' => [
                    'username' => ['The username has already been taken.']
                ]
            ], 409);
        }

        // Update the user.
        $user = User::find($user->id);
        if ($request->name !== $user->name) {
            $user->name = $request->name;
        }

        if ($request->username !== $user->username) {
            $user->username = $request->username;
        }

        if ($request->email !== $user->email) {
            $user->email = $request->email;
        }

        if ($request->new_password) {
            $user->password = Hash::make($request->new_password);
        }

        // Update the avatar if it was provided.
        if ($request->hasFile('avatar')) {
            $user->avatar = $request->file('avatar')->store('avatars');
        }

        $user->save();

        return response()->json(new UserEmailResource($user));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, User $user)
    {
        // Check if the user is authorized to delete the account.
        if ($request->user()->id !== $user->id) {
            abort(403, 'Unauthorized');
        }

        // Inmortal admin!!!
        if ($user->admin) {
            abort(403, 'Unauthorized');
        }

        // Validate the request.
        $request->validate([
            'password' => 'required|string'
        ]);

        // Check if the password is correct.
        if (!Hash::check($request->password, $request->user()->password)) {
            abort(403, 'Unauthorized');
        }

        // Detach the user from all of their cats.
        foreach ($user->cats()->get() as $cat) {
            $cat->users()->detach($request->user());

            // Delete the cat if they don't have any owners.
            if ($cat->users()->count() === 0) {
                foreach ($cat->followers()->get() as $follower) {
                    $follower->decrement('following_count');
                }

                $cat->delete();
            }
        }

        // Update the counts of the post's relations.
        foreach ($user->likes()->get() as $like) {
            $like->post->decrement('likes_count');
        }

        foreach ($user->saves()->get() as $save) {
            $save->post->decrement('saves_count');
        }

        foreach ($user->comments()->get() as $comment) {
            $comment->post->decrement('comments_count');
        }

        foreach ($user->commentLikes()->get() as $commentLike) {
            $commentLike->comment->decrement('likes_count');
        }

        foreach ($user->following()->get() as $followed_cat) {
            $followed_cat->decrement('followers_count');
        }

        // Delete the user.
        $user->delete();

        // Logout the user if they are deleting their own account.
        if (auth()->id() === $user->id) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        // Send a goodbye email.
        if (!EmailRateLimiter::isRateLimited()) {
            Mail::to($user->email)->send(new GoodbyeMail($user->name));
        }

        // Goodbye :(
        return response()->json(null, 204);
    }

    public function showCats(User $user)
    {
        return response()->json(new CatCollection($user->cats));
    }

    public function checkEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        return response()->json([
            'available' => !User::where('email', $request->email)->exists()
        ]);
    }

    public function checkUsername(Request $request)
    {
        $request->validate([
            'username' => 'required|string|min:3|max:32'
        ]);

        return response()->json([
            'available' => !User::where('username', $request->username)->exists()
        ]);
    }

    public function updateAvatar(Request $request, ImageEngineService $imageEngineService)
    {
        $request->validate([
            'avatar' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:20480']
        ]);

        $user = $request->user();
        $oldAvatar = $user->avatar;
        $avatar = $request->file('avatar');

        $optimizedFile = $imageEngineService->optimizeImage($avatar, true);
        $filename = Str::random(40) . '.webp';
        Storage::disk('avatars')->put($filename, $optimizedFile);

        $user->avatar = $filename;
        $user->save();

        // Delete the old avatar file.
        if ($oldAvatar) {
            $path = storage_path('app/avatars/' . $oldAvatar);
            if (file_exists($path)) {
                unlink($path);
            }
        }

        return response()->json(
            ['avatar' => config('app.url') . "api/v1/users/{$user->id}/avatar"],
        );
    }

    public function deleteAvatar(Request $request)
    {
        $user = $request->user();

        if (!$user->avatar) {
            return response()->json(['message' => 'The user does not have an avatar.'], 404);
        }

        // Delete the avatar file.
        $path = storage_path('app/avatars/' . $user->avatar);
        if (file_exists($path)) {
            unlink($path);
        }

        $user->avatar = null;
        $user->save();

        return response()->json(
            ['avatar' => null],
        );
    }

    public function avatar(User $user)
    {
        if (!$user->avatar) {
            return response()->json(['message' => 'The user does not have an avatar.'], 404);
        }

        // Support for Google avatars.
        if (filter_var($user->avatar, FILTER_VALIDATE_URL)) {
            return response()->redirectTo($user->avatar);
        }

        $path = storage_path('app/avatars/' . $user->avatar);
        return response()->file($path);
    }

    public function following(User $user)
    {
        return response()->json(new UserCollection($user->following()->paginate(10)));
    }

    public function feed(Request $request)
    {
        $user = $request->user();

        $catsIds = $user->following()->pluck('cats.id');

        $posts = Post::whereIn('cat_id', $catsIds)
            ->where('detected', true)
            ->with(['comments' => function ($query) {
                $query->latest()->take(3);
            }, 'cat'])
            ->latest()
            ->paginate(10);

        return response()->json(new PostCollection($posts));
    }

    public function updateSettings(Request $request)
    {
        $request->validate([
            'language' => 'required|string|in:en,es,ca,ja,it,pt,de',
        ]);

        $user = $request->user();
        $user->settings->update($request->all());

        return response()->json(null, 204);
    }
}
