<?php

namespace App\Http\Controllers;

use App\Models\Cat;
use App\Models\Post;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function approve(Post $post)
    {
        $post->update([
            'detected' => true,
        ]);

        return response()->json(null, 204);
    }

    public function deleteUserOfPost(Post $post)
    {
        $user = $post->user;

        // Detach the user from all of their cats.
        foreach ($user->cats()->get() as $cat) {
            $cat->users()->detach($user);

            // Delete the cat if they don't have any owners.
            if ($cat->users()->count() === 0) {
                $cat->delete();
            }
        }

        $user->delete();

        return response()->json(null, 204);
    }

    public function deleteUsersOfCat(Cat $cat)
    {
        foreach ($cat->users as $user) {
            $user->delete();

            // Detach the user from all of their cats.
            foreach ($user->cats()->get() as $cat) {
                $cat->users()->detach($user);

                // Delete the cat if they don't have any owners.
                if ($cat->users()->count() === 0) {
                    $cat->delete();
                }
            }
        }

        return response()->json(null, 204);
    }
}
