<?php

use App\Models\Cat;
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
        Schema::table('cats', function (Blueprint $table) {
            $table->enum('sex', ['M', 'F'])->nullable();
        });

        Cat::whereNull('sex')->update(['sex' => 'M']);

        Schema::table('cats', function (Blueprint $table) {
            $table->enum('sex', ['M', 'F'])->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cats', function (Blueprint $table) {
            $table->dropColumn('sex');
        });
    }
};
