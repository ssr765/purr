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
        $response = Http::attach('file', file_get_contents($image), basename($image))->post($this->uri . '/optimize');

        // Throw an exception if the request failed.
        if ($response->failed()) {
            throw new \Exception('Failed to optimize image');
        }

        // Return the optimized image filename (the webp one).
        return $response->body();
    }

    public function analyzeImage($image)
    {
        // Send the image path to the image engine API.
        $response = Http::attach('file', file_get_contents($image), basename($image))->post($this->uri . '/analyze');

        // Throw an exception if the request failed.
        if ($response->failed()) {
            throw new \Exception($response->json());
        }

        // Return the image analysis.
        return $response->json();
    }
}
