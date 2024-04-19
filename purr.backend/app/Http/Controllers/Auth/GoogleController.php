<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

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
            $newUser = new User();
            $newUser->name = $user->name;
            $newUser->username = 'cat_lover' . rand(100000000, 999999999);
            $newUser->email = $user->email;
            $newUser->google_id = $user->id;
            $newUser->save();

            auth()->login($newUser, true);
        }

        return response()->redirectTo($this->frontendUrl . $this->redirectTo);
    }
}
