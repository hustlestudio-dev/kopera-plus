<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string|null $trigger_condition
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['name', 'description', 'trigger_condition'])]
class Badge extends Model
{
    use HasFactory;

    public function memberBadges(): HasMany
    {
        return $this->hasMany(MemberBadge::class);
    }

    /**
     * Get the users who earned this badge.
     *
     * @return BelongsToMany<User, $this, MemberBadge, 'pivot'>
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'member_badges')
            ->using(MemberBadge::class)
            ->withPivot(['earned_at'])
            ->withTimestamps();
    }

    protected function casts(): array
    {
        return [
            'trigger_condition' => 'array',
        ];
    }
}
