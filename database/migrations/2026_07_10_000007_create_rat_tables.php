<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rat_agendas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cooperative_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('status')->default('draft');
            $table->timestamp('voting_opens_at')->nullable();
            $table->timestamp('voting_closes_at')->nullable();
            $table->timestamps();
        });

        Schema::create('rat_agenda_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rat_agenda_id')->constrained('rat_agendas')->cascadeOnDelete();
            $table->string('item_title');
            $table->string('agenda_type');
            $table->boolean('is_votable')->default(true);
            $table->boolean('is_secret_ballot')->default(false);
            $table->json('vote_options')->nullable();
            $table->timestamps();
        });

        Schema::create('rat_attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rat_agenda_id')->constrained('rat_agendas')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('attendance_mode');
            $table->timestamp('checked_in_at')->nullable();
            $table->timestamps();

            $table->unique(['rat_agenda_id', 'user_id']);
        });

        Schema::create('rat_votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rat_agenda_item_id')->constrained('rat_agenda_items')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('selected_option');
            $table->timestamp('voted_at')->nullable();
            $table->timestamps();

            $table->unique(['rat_agenda_item_id', 'user_id']);
        });

        Schema::create('rat_ai_summaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rat_agenda_id')->constrained('rat_agendas')->cascadeOnDelete();
            $table->text('summary_text')->nullable();
            $table->text('impact_simulation')->nullable();
            $table->timestamp('generated_at')->nullable();
            $table->timestamps();

            $table->unique('rat_agenda_id');
        });

        Schema::create('rat_result_summaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rat_agenda_id')->constrained('rat_agendas')->cascadeOnDelete();
            $table->decimal('participation_rate', 5, 2)->nullable();
            $table->text('ai_followup_recommendation')->nullable();
            $table->timestamp('generated_at')->nullable();
            $table->timestamps();

            $table->unique('rat_agenda_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rat_result_summaries');
        Schema::dropIfExists('rat_ai_summaries');
        Schema::dropIfExists('rat_votes');
        Schema::dropIfExists('rat_attendances');
        Schema::dropIfExists('rat_agenda_items');
        Schema::dropIfExists('rat_agendas');
    }
};
