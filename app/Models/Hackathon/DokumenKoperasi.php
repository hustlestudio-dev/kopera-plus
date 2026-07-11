<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class DokumenKoperasi extends HackathonModel
{
    protected $table = 'dokumen_koperasi';

    protected $primaryKey = 'dokumen_ref';

    protected function casts(): array
    {
        return [
            'tanggal_berlaku' => 'datetime',
            'tanggal_kadaluarsa' => 'datetime',
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
