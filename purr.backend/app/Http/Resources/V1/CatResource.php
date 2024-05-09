<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

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
            'avatar' => $this->avatar ? URL::to("/api/v1/cats/{$this->id}/avatar") : null,
            'biography' => $this->biography,
            'birthdate' => $this->birthdate,
            'deathdate' => $this->deathdate,
            'adoption' => $this->adoption,
            'followers_count' => $this->followers_count,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            // Posts only shown if accesing to the cat detail.
            'posts' => new PostCollection($this->whenLoaded('posts')),
        ];
    }
}
