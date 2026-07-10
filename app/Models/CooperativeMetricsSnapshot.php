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
 * @property int $total_members
 * @property int $active_members
 * @property float $total_transactions
 * @property float $total_shu
 * @property Carbon $snapshot_date
 */
#[Fillable(['cooperative_id', 'total_members', 'active_members', 'total_transactions', 'total_shu', 'snapshot_date'])]
class CooperativeMetricsSnapshot extends Model
{
    use HasFactory;

    public function cooperative(): BelongsTo
    {
        return $this->belongsTo(Cooperative::class);
    }

    protected function casts(): array
    {
        return [
            'snapshot_date' => 'date',
            'total_transactions' => 'decimal:2',
            'total_shu' => 'decimal:2',
        ];
    }
}
