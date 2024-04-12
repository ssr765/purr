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
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->unique();
            $table->string('avatar')->nullable();
            $table->string('biography')->nullable();
            $table->string('google_id')->nullable()->unique();
            $table->string('password')->nullable()->change();
            $table->integer('following')->default(0)->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('username');
            $table->dropColumn('avatar');
            $table->dropColumn('biography');
            $table->dropColumn('google_id');
            $table->string('password')->change();
            $table->dropColumn('following');
        });
    }
};
