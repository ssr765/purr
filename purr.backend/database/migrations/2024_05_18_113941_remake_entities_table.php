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
        Schema::table('entities', function (Blueprint $table) {
            $table->dropColumn('dni');
            $table->dropColumn('slug');
            $table->dropColumn('description');
            $table->dropColumn('status');
            $table->dropColumn('location');
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');

            $table->string('address');
            $table->double('lat');
            $table->double('lng');
            $table->string('logo')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('entities', function (Blueprint $table) {
            $table->string('dni')->unique();
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('status')->default('processing');
            $table->string('location');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->dropColumn('address');
            $table->dropColumn('lat');
            $table->dropColumn('lng');
            $table->dropColumn('logo');
        });
    }
};
