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
            'breed' => $this->breed,
            'color' => $this->color,
            'avatar' => $this->avatar,
            'biography' => $this->biography,
            'birthday' => $this->birthday,
            'deathdate' => $this->deathdate,
            'followers' => $this->followers,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            // Posts only shown if accesing to the cat detail.
            'posts' => new PostCollection($this->whenLoaded('posts')),
        ];
    }
}
