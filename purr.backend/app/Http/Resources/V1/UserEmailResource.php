<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserEmailResource extends JsonResource
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
            'email' => $this->email,
            'username' => $this->username,
            'avatar' => $this->avatar ? config('app.url') . "api/v1/users/{$this->id}/avatar" : null,
            'biography' => $this->biography,
            'following_count' => $this->following_count,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'cats' => CatResource::collection($this->whenLoaded('cats')),
            'settings' => $this->whenLoaded('settings', new SettingsResource($this->settings)),
            'admin' => $this->admin ? true : false,
        ];
    }
}
