<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class ReferensiDokumenKoperasi extends HackathonModel
{
    protected $table = 'referensi_dokumen_koperasi';

    protected $primaryKey = 'jenis_dokumen_ref';

    protected function casts(): array
    {
        return [
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
