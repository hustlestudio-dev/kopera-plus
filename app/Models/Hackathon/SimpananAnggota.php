<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class SimpananAnggota extends HackathonModel
{
    protected $table = 'simpanan_anggota';

    protected $primaryKey = 'simpanan_ref';

    protected function casts(): array
    {
        return [
            'jumlah_simpanan' => 'decimal:2',
            'dibayar_pada' => 'datetime',
            'dibuat_pada' => 'datetime',
        ];
    }
}
