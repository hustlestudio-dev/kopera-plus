<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $rat_agenda_item_id
 * @property int $user_id
 * @property string $selected_option
 * @property Carbon|null $voted_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['rat_agenda_item_id', 'user_id', 'selected_option', 'voted_at'])]
class RatVote extends Model
{
    use HasFactory;

    public function agendaItem(): BelongsTo
    {
        return $this->belongsTo(RatAgendaItem::class, 'rat_agenda_item_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'voted_at' => 'datetime',
        ];
    }
}
