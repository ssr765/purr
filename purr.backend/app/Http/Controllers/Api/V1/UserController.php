<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\CatCollection;
use App\Http\Resources\V1\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
    public function update(Request $request, string $id)
    {
        //
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
                $cat->delete();
            }
        }

        // Delete the user.
        $request->user()->delete();

        // Logout the user if they are deleting their own account.
        if (auth()->id() === $user->id) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
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
}
