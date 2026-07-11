<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class PengajuanRekeningBank extends HackathonModel
{
    protected $table = 'pengajuan_rekening_bank';

    protected $primaryKey = 'pengajuan_rekening_ref';

    protected function casts(): array
    {
        return [
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
