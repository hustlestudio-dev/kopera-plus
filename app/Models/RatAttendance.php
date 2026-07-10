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
 * @property int $user_id
 * @property string $attendance_mode
 * @property Carbon|null $checked_in_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['rat_agenda_id', 'user_id', 'attendance_mode', 'checked_in_at'])]
class RatAttendance extends Model
{
    use HasFactory;

    public function agenda(): BelongsTo
    {
        return $this->belongsTo(RatAgenda::class, 'rat_agenda_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'checked_in_at' => 'datetime',
        ];
    }
}
