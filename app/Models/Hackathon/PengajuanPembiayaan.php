<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class PengajuanPembiayaan extends HackathonModel
{
    protected $table = 'pengajuan_pembiayaan';

    protected $primaryKey = 'pengajuan_pembiayaan_ref';

    protected function casts(): array
    {
        return [
            'nominal_permohonan' => 'decimal:2',
            'tenor' => 'integer',
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
