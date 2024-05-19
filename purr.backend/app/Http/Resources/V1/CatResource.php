<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'catname' => $this->catname,
            'sex' => $this->sex,
            'breed' => $this->breed,
            'color' => $this->color,
            'avatar' => $this->avatar ? config('app.url') . "api/v1/cats/{$this->id}/avatar" : null,
            'biography' => $this->biography,
            'birthdate' => $this->birthdate,
            'deathdate' => $this->deathdate,
            'adoption' => $this->adoption,
            'followers_count' => $this->followers_count,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            // followed when  the user is logged in
            'followed' => $this->when($request->user(), fn () => $this->followedByUser($request->user())),
        ];
    }
}
