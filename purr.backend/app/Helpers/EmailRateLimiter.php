<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Redis;

class EmailRateLimiter
{
    public static function isRateLimited($limit = 20)
    {
        // Rate limit emails to 20 per day
        $key = "emails_sent";

        $emailsSent = Redis::incr($key);
        if ($emailsSent == 1) {
            Redis::expire($key, 86400); // 24h
        }

        return $emailsSent > $limit;
    }
}
