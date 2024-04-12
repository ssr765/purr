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
        Schema::create('cats', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('catname')->unique();
            $table->string('breed')->nullable();
            $table->string('color')->nullable();
            $table->string('avatar')->nullable();
            $table->string('biography')->nullable();
            $table->date('birthday')->nullable();
            $table->date('deathdate')->nullable();
            $table->integer('followers')->default(0)->unsigned();
            $table->string('password');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cats');
    }
};
