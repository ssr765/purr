<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ImageEngineService
{
    protected $uri;

    public function __construct()
    {
        $this->uri = config('services.imageEngineApi.uri');
    }

    public function optimizeImage($image)
    {
        // Send the image path to the image engine API.
        $response = Http::post($this->uri . '/webp', [
            'input' => $image
        ]);

        // Throw an exception if the request failed.
        if ($response->failed()) {
            throw new \Exception('Failed to optimize image');
        }

        // Return the optimized image filename (the webp one).
        return $response->json()['filename'];
    }
}
