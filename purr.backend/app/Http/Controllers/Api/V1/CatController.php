<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCatRequest;
use App\Http\Requests\UpdateCatRequest;
use App\Http\Resources\V1\CatResource;
use App\Models\Cat;
use App\Services\ImageEngineService;
use Illuminate\Http\Request;

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
        $cat = Cat::create($request->validated());
        $request->user()->cats()->attach($cat);

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar')->store('', 'avatars');
            $avatar = $imageEngineService->optimizeImage(storage_path('app/avatars/' . $avatar));

            $cat->update(['avatar' => $avatar]);
            $cat->avatar = $avatar;
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
        //
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
}
