<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class ReferensiWilayah extends HackathonModel
{
    protected $table = 'referensi_wilayah';

    protected $primaryKey = 'kode_wilayah';

    protected function casts(): array
    {
        return [
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
