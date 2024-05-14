<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'url' => config('app.url') . "api/v1/posts/{$this->id}/media",
            'caption' => $this->caption,
            'type' => $this->type,
            'likesData' => [
                'isLiked' => $request->user() ? $this->likedByUser($request->user()) : false,
                'count' => $this->likes_count,
            ],
            'savesData' => [
                'isSaved' => $request->user() ? $this->savedByUser($request->user()) : false,
                'count' => $this->saves_count,
            ],
            'commentsCount' => $this->comments_count,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            // Only shown if accesing to the post detail or the post list.
            'cat' => new CatResource($this->whenLoaded('cat')),
            // 'comments' => $this->when($this->comments_count > 0, CommentResource::collection($this->comments)),
            'comments' => $this->whenLoaded('comments', CommentResource::collection($this->comments)),
            'detected' => $this->detected ? true : false,
        ];
    }
}
