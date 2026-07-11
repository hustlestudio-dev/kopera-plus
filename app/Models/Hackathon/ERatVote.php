<?php

namespace App\Models\Hackathon;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ERatVote extends Model
{
    protected $table = 'e_rat_votes';

    protected $fillable = [
        'rat_koperasi_id',
        'user_id',
        'pilihan',
    ];

    public function ratKoperasi(): BelongsTo
    {
        return $this->belongsTo(RatKoperasi::class, 'rat_koperasi_id', 'rat_sample_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
