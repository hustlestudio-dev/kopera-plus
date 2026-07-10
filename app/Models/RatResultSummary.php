<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $rat_agenda_id
 * @property float|null $participation_rate
 * @property string|null $ai_followup_recommendation
 * @property Carbon|null $generated_at
 */
#[Fillable(['rat_agenda_id', 'participation_rate', 'ai_followup_recommendation', 'generated_at'])]
class RatResultSummary extends Model
{
    use HasFactory;

    public function agenda(): BelongsTo
    {
        return $this->belongsTo(RatAgenda::class, 'rat_agenda_id');
    }

    protected function casts(): array
    {
        return [
            'participation_rate' => 'decimal:2',
            'generated_at' => 'datetime',
        ];
    }
}
