<?php

namespace App\Models\Hackathon;

use Illuminate\Database\Eloquent\Model;

/**
 * Read-only base for the committee hackathon dump.
 *
 * These tables are restored committee source data; they must never be mutated
 * by the application. Any write attempt throws.
 */
abstract class HackathonModel extends Model
{
    public $timestamps = false;

    public $incrementing = false;

    protected $guarded = [];

    protected static function booted(): void
    {
        // read-only: committee dump
        $deny = static fn (): never => throw new \BadMethodCallException('read-only: committee dump');

        static::saving($deny);
        static::creating($deny);
        static::updating($deny);
        static::deleting($deny);
    }
}
