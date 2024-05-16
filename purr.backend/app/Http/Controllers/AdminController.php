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

        $user->delete();

        return response()->json(null, 204);
    }

    public function deleteUsersOfCat(Cat $cat)
    {
        foreach ($cat->users as $user) {
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

            $user->delete();

            // Detach the user from all of their cats.
            foreach ($user->cats()->get() as $cat) {
                $cat->users()->detach($user);

                // Delete the cat if they don't have any owners.
                if ($cat->users()->count() === 0) {
                    foreach ($cat->followers()->get() as $follower) {
                        $follower->decrement('following_count');
                    }

                    $cat->delete();
                }
            }
        }

        return response()->json(null, 204);
    }
}
