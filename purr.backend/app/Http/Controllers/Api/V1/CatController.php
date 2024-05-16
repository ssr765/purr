<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCatRequest;
use App\Http\Requests\UpdateCatRequest;
use App\Http\Resources\V1\CatResource;
use App\Http\Resources\V1\UserCollection;
use App\Models\Cat;
use App\Services\ImageEngineService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CatController extends Controller
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
    public function store(StoreCatRequest $request, ImageEngineService $imageEngineService)
    {
        $cat = Cat::create([
            'name' => $request->name,
            'catname' => $request->catname,
            'sex' => $request->sex,
            'breed' => $request->breed,
            'color' => $request->color,
            'biography' => $request->biography,
            'birthdate' => $request->birthdate,
            'deathdate' => $request->deathdate,
            'password' => bcrypt($request->password),
            'adoption' => $request->adoption === 'true',
        ]);

        $cat->save();

        $request->user()->cats()->attach($cat);

        // Save the avatar.
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');

            // Optimize the image.
            $optimizedFile = $imageEngineService->optimizeImage($avatar);
            $filename = Str::random(40) . '.webp';
            Storage::disk('avatars')->put($filename, $optimizedFile);

            $cat->avatar = $filename;
            $cat->save();
        }

        return response()->json(new CatResource($cat), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cat $cat)
    {
        // Get the cat with its posts.
        return response()->json(new CatResource($cat->load('posts')));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCatRequest $request, Cat $cat)
    {
        // Check if the user owns the cat to update it.
        if ($request->user()->cats()->where('cat_id', $cat->id)->doesntExist()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Check if the password is correct.
        if (!Hash::check($request->password, $cat->password)) {
            abort(403, 'Unauthorized');
        }

        $cat->update([
            'name' => $request->name ?? $cat->name,
            'catname' => $request->catname ?? $cat->catname,
            'breed' => $request->breed ?? $cat->breed,
            'color' => $request->color ?? $cat->color,
            'biography' => $request->biography ?? $cat->biography,
            'password' => $request->new_password ? bcrypt($request->new_password) : $cat->password,
            'adoption' => empty($request->adoption) ? $cat->adoption : $request->adoption,
        ]);

        return response()->json(new CatResource($cat), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cat $cat)
    {
        // Check if the user owns the cat to delete it.
        if (request()->user()->cannot('delete', $cat)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        foreach ($cat->followers()->get() as $follower) {
            $follower->decrement('following_count');
        }

        $cat->delete();
        return response()->json($cat, 200);
    }

    /**
     * Display the specified resource by catname.
     */
    public function showByCatname(string $catname)
    {
        $cat = Cat::where('catname', $catname)->first();

        if (!$cat) {
            return response()->json(['message' => 'Cat not found'], 404);
        }

        return response()->json(new CatResource($cat->load('posts')));
    }

    public function checkCatname(Request $request)
    {
        $request->validate([
            'catname' => 'required|string|min:3|max:30|not_in:create'
        ]);

        $exists = Cat::where('catname', strtolower($request->catname))->exists();
        return response()->json(['exists' => $exists]);
    }

    public function avatar(Cat $cat)
    {
        if (!$cat->avatar) {
            abort(404);
        }

        $path = storage_path('app/avatars/' . $cat->avatar);
        return response()->file($path);
    }

    public function random()
    {
        $cat = Cat::inRandomOrder()->first();

        if (!$cat) {
            return response()->json(['message' => 'No cats found'], 404);
        }

        return response()->json(new CatResource($cat->load('posts')));
    }

    public function follow(Cat $cat)
    {
        $user = request()->user();

        if ($user->following()->where('cat_id', $cat->id)->exists()) {
            return response()->json(['message' => 'Already following'], 409);
        }

        $user->increment('following_count');
        $cat->increment('followers_count');
        $user->following()->attach($cat);

        return response()->json([
            'cat' => [
                'followers_count' => $cat->followers_count,
                'followed' => true,
            ],
            'user' => [
                'following_count' => $user->following_count
            ]
        ], 201);
    }

    public function unfollow(Cat $cat)
    {
        $user = request()->user();

        if (!$user->following()->where('cat_id', $cat->id)->exists()) {
            return response()->json(['message' => 'Not following'], 409);
        }

        $user->decrement('following_count');
        $cat->decrement('followers_count');
        $user->following()->detach($cat);

        return response()->json([
            'cat' => [
                'followers_count' => $cat->followers_count,
                'followed' => false,
            ],
            'user' => [
                'following_count' => $user->following_count
            ]

        ], 200);
    }

    public function followers(Cat $cat)
    {
        return response()->json(new UserCollection($cat->followers()->paginate(10)));
    }

    public function share(Request $request, string $catname)
    {
        $request->validate([
            'password' => 'required|string',
        ]);

        $cat = Cat::where('catname', $catname)->first();

        if (!$cat) {
            return response()->json(['message' => 'Cat not found'], 404);
        }

        if ($cat->users()->where('user_id', $request->user()->id)->exists()) {
            return response()->json(['message' => 'You already own this cat!'], 409);
        }

        if (!password_verify($request->password, $cat->password)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $cat->users()->attach($request->user());

        return response()->json(new CatResource($cat));
    }
}
