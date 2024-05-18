<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Entity;
use App\Http\Requests\StoreEntityRequest;
use App\Http\Requests\UpdateEntityRequest;
use App\Http\Resources\V1\EntityResource;

class EntityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $entities = Entity::all();
        return response()->json(EntityResource::collection($entities));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEntityRequest $request)
    {
        // $user = $request->user();

        // if ($user->entity) {
        //     return response()->json(['message' => 'User already has an entity'], 409);
        // }

        // $entity = Entity::create([
        //     'name' => $request->name,
        //     'dni' => $request->dni,
        //     'slug' => $request->slug,
        //     'description' => $request->description,
        //     'type' => $request->type,
        //     'webpage' => $request->webpage,
        //     'location' => $request->location,
        //     'phone' => $request->phone,
        //     'user_id' => $user->id,
        // ]);

        // $user->update([
        //     'entity_id' => $entity->id,
        // ]);

        // $entity->refresh();
        // return response()->json(new EntityResource($entity), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Entity $entity)
    {
        return response()->json(new EntityResource($entity));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEntityRequest $request, Entity $entity)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entity $entity)
    {
        //
    }
}
