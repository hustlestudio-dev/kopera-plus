<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $cooperative_id
 * @property int $source_post_id
 * @property string|null $ai_recommendation_reason
 * @property float|null $relevance_score
 * @property Carbon|null $generated_at
 */
#[Fillable(['cooperative_id', 'source_post_id', 'ai_recommendation_reason', 'relevance_score', 'generated_at'])]
class CrossKopdesInsight extends Model
{
    use HasFactory;

    public function cooperative(): BelongsTo
    {
        return $this->belongsTo(Cooperative::class);
    }

    public function sourcePost(): BelongsTo
    {
        return $this->belongsTo(CommunityPost::class, 'source_post_id');
    }

    protected function casts(): array
    {
        return [
            'relevance_score' => 'decimal:2',
            'generated_at' => 'datetime',
        ];
    }
}
