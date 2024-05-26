<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        // If the collection is not paginated, the basic output will be returned.
        if (!method_exists($this->resource, 'currentPage')) {
            return parent::toArray($request);
        }

        $result = [
            'data' => $this->collection,
        ];

        // Check if the collection is paginated.
        // Add links and meta only if the collection is paginated.
        $result['links'] = [
            'self' => $this->url($this->currentPage()),
            'next' => $this->nextPageUrl(),
            'prev' => $this->previousPageUrl(),
        ];

        $result['meta'] = [
            'current_page' => $this->currentPage(),
            'from' => $this->firstItem(),
            'last_page' => $this->lastPage(),
            'path' => $this->path(),
            'per_page' => $this->perPage(),
            'to' => $this->lastItem(),
            'total' => $this->total(),
        ];

        return $result;
    }
}
