<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            'content' => $this->content,
            'parent' => $this->parent_id,
            // 'post' => $this->whenLoaded('post', new PostResource($this->post)),
            'user' => new UserResource($this->user),
            'liked' => $this->when($request->user(), fn () => $this->likedByUser($request->user())),
            'likesCount' => $this->likes_count,
            'repliesCount' => $this->replies_count,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
