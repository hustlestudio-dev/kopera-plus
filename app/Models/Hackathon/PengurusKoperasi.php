<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class PengurusKoperasi extends HackathonModel
{
    protected $table = 'pengurus_koperasi';

    protected $primaryKey = 'pengurus_ref';

    protected function casts(): array
    {
        return [
            'tanggal_lahir' => 'datetime',
            'periode_mulai' => 'datetime',
            'periode_selesai' => 'datetime',
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
