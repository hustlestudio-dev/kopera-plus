<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class PengajuanKemitraan extends HackathonModel
{
    protected $table = 'pengajuan_kemitraan';

    protected $primaryKey = 'pengajuan_kemitraan_ref';

    protected function casts(): array
    {
        return [
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
