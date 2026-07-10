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
 * @property string|null $summary_text
 * @property string|null $impact_simulation
 * @property Carbon|null $generated_at
 */
#[Fillable(['rat_agenda_id', 'summary_text', 'impact_simulation', 'generated_at'])]
class RatAiSummary extends Model
{
    use HasFactory;

    public function agenda(): BelongsTo
    {
        return $this->belongsTo(RatAgenda::class, 'rat_agenda_id');
    }

    protected function casts(): array
    {
        return [
            'generated_at' => 'datetime',
        ];
    }
}
