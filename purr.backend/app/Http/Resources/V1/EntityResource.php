<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EntityResource extends JsonResource
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
            'dni' => $this->dni,
            'slug' => $this->slug,
            'description' => $this->description,
            'type' => $this->type,
            'status' => $this->status,
            'webpage' => $this->webpage,
            'location' => $this->location,
            'phone' => $this->phone,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
