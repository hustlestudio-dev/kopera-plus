<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // M9 e-RAT votes. Populated by agent-m9.
        Schema::create('e_rat_votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rat_koperasi_id')->constrained('rat_koperasi');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->string('pilihan');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('e_rat_votes');
    }
};
