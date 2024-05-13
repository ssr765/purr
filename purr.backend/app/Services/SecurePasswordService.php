<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SecurePasswordService
{
    public function generate($length = 20)
    {
        $uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $lowercase = 'abcdefghijklmnopqrstuvwxyz';
        $numbers = '0123456789';
        $symbols = '!@#$%^&*()_-+=<>?';
        $all = $uppercase . $lowercase . $numbers . $symbols;
        $password = '';
        for ($i = 0; $i < $length; $i++) {
            $password .= $all[rand(0, strlen($all) - 1)];
        }
        return $password;
    }
}
