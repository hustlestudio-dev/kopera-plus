<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class ReferensiGeraiKoperasi extends HackathonModel
{
    protected $table = 'referensi_gerai_koperasi';

    protected $primaryKey = 'jenis_gerai_ref';

    protected function casts(): array
    {
        return [
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
