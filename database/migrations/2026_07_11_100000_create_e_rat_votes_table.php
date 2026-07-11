<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // M9 e-RAT votes. Populated by agent-m9.
        // rat_koperasi PK is `rat_sample_id` (text), so the FK is referenced explicitly.
        Schema::create('e_rat_votes', function (Blueprint $table) {
            $table->id();
            $table->string('rat_koperasi_id');
            $table->foreign('rat_koperasi_id')->references('rat_sample_id')->on('rat_koperasi');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->string('pilihan');
            $table->timestamps();

            $table->index('rat_koperasi_id');
            $table->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('e_rat_votes');
    }
};
