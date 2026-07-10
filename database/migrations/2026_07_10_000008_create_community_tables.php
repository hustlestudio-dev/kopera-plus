<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('community_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cooperative_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('content');
            $table->timestamps();
        });

        Schema::create('cross_kopdes_insights', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cooperative_id')->constrained()->cascadeOnDelete();
            $table->foreignId('source_post_id')->constrained('community_posts')->cascadeOnDelete();
            $table->text('ai_recommendation_reason')->nullable();
            $table->decimal('relevance_score', 5, 2)->nullable();
            $table->timestamp('generated_at')->nullable();
            $table->timestamps();

            $table->index(['cooperative_id', 'relevance_score']);
        });

        Schema::create('cooperative_metrics_snapshots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cooperative_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('total_members')->default(0);
            $table->unsignedInteger('active_members')->default(0);
            $table->decimal('total_transactions', 15, 2)->default(0);
            $table->decimal('total_shu', 15, 2)->default(0);
            $table->date('snapshot_date');
            $table->timestamps();

            $table->unique(['cooperative_id', 'snapshot_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cooperative_metrics_snapshots');
        Schema::dropIfExists('cross_kopdes_insights');
        Schema::dropIfExists('community_posts');
    }
};
