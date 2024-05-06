<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('post_likes', function (Blueprint $table) {
            $table->unique(['user_id', 'post_id']);
        });

        Schema::table('saves', function (Blueprint $table) {
            $table->unique(['user_id', 'post_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('post_likes', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'post_id']);
        });

        Schema::table('saves', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'post_id']);
        });
    }
};
