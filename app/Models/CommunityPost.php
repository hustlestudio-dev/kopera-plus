<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CommunityPost extends Model
{
    protected $fillable = ['user_id', 'title', 'content', 'category', 'likes', 'comments_count'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
