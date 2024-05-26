<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\EmailRateLimiter;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\UserEmailResource;
use App\Mail\WelcomeMail;
use App\Models\Settings;
use App\Models\User;
use App\Rules\EmailValidator;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class, new EmailValidator()],
            'password' => ['required', 'confirmed', Rules\Password::min(8)->mixedCase()->letters()->numbers()->symbols()],
            'username' => ['required', 'string', 'unique:' . User::class, 'regex:/^[\w\d\.]{3,30}$/', 'min:3', 'max:30', 'not_in:email,username'],
            'biography' => ['nullable', 'string', 'max:255'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'username' => $request->username,
            'biography' => $request->biography,
            'avatar' => null,
        ]);

        if (!EmailRateLimiter::isRateLimited()) {
            Mail::to($user->email)->send(new WelcomeMail($user->name));
        }

        event(new Registered($user));

        Auth::login($user);

        // Create settings for the user
        Settings::create(['user_id' => $user->id]);

        $user->refresh();

        return response()->json(new UserEmailResource($user->load('settings')), 201);
    }
}
