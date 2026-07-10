<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $rat_agenda_id
 * @property string $item_title
 * @property string $agenda_type
 * @property bool $is_votable
 * @property bool $is_secret_ballot
 * @property array<int, string>|null $vote_options
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['rat_agenda_id', 'item_title', 'agenda_type', 'is_votable', 'is_secret_ballot', 'vote_options'])]
class RatAgendaItem extends Model
{
    use HasFactory;

    public function agenda(): BelongsTo
    {
        return $this->belongsTo(RatAgenda::class, 'rat_agenda_id');
    }

    public function votes(): HasMany
    {
        return $this->hasMany(RatVote::class);
    }

    protected function casts(): array
    {
        return [
            'is_votable' => 'boolean',
            'is_secret_ballot' => 'boolean',
            'vote_options' => 'array',
        ];
    }
}
