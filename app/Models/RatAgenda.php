<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $cooperative_id
 * @property string $title
 * @property string|null $description
 * @property string $status
 * @property Carbon|null $voting_opens_at
 * @property Carbon|null $voting_closes_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['cooperative_id', 'title', 'description', 'status', 'voting_opens_at', 'voting_closes_at'])]
class RatAgenda extends Model
{
    use HasFactory;

    public function cooperative(): BelongsTo
    {
        return $this->belongsTo(Cooperative::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(RatAgendaItem::class);
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(RatAttendance::class);
    }

    public function aiSummary(): HasOne
    {
        return $this->hasOne(RatAiSummary::class);
    }

    public function resultSummary(): HasOne
    {
        return $this->hasOne(RatResultSummary::class);
    }

    protected function casts(): array
    {
        return [
            'voting_opens_at' => 'datetime',
            'voting_closes_at' => 'datetime',
        ];
    }
}
