<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class GoogleController extends Controller
{
    protected $frontendUrl;
    protected $redirectTo;

    public function __construct()
    {
        $this->frontendUrl = config('app.frontend_url');
        $this->redirectTo = '/app';
    }

    /**
     * Redirect the user to the Google authentication page.
     */
    public function redirectToGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Obtain the user information from Google.
     */
    public function handleGoogleCallback(): RedirectResponse
    {
        $user = Socialite::driver('google')->user();

        $existingUser = User::where('google_id', $user->id)->first();

        if ($existingUser) {
            // If the user exists, log them in.
            auth()->login($existingUser, true);
        } else {
            // If the user does not exist, create a new user and log them in.
            // Generate a username based on the email address.
            //   Replace special characters with underscores.
            //   Append a random 4-digit number to the end of the username.
            //   Limit the username to 30 characters, including the random number.
            $username = substr(preg_replace('/[+-\?%!]/', '_', explode('@', $user->email)[0]), 0, 25) . '_' . rand(1000, 9999);

            // Check if the username already exists and generate a new one if it does.
            $usernameExists = User::where('username', $username)->exists();
            if ($usernameExists) {
                $username = Str::random(30);
            }

            $newUser = new User();
            $newUser->name = $user->name;
            $newUser->username = $username;
            $newUser->email = $user->email;
            $newUser->google_id = $user->id;
            $newUser->save();

            auth()->login($newUser, true);
        }

        return response()->redirectTo($this->frontendUrl . $this->redirectTo);
    }
}
