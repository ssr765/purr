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
        Schema::create('entities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('dni')->unique();
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('type');
            $table->string('status')->default('processing');
            $table->string('webpage')->nullable();
            $table->string('location');
            $table->string('phone');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entities');
    }
};
