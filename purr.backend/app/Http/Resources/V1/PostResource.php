<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class PostResource extends JsonResource
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
            'url' => URL::to("/api/v1/posts/{$this->id}/media"),
            'caption' => $this->caption,
            'type' => $this->type,
            'likesCount' => $this->likes_count,
            'commentsCount' => $this->comments_count,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            // Only shown if accesing to the post detail or the post list.
            'cat' => new CatResource($this->whenLoaded('cat')),
        ];
    }
}
