<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class ReferensiKomoditasDesa extends HackathonModel
{
    protected $table = 'referensi_komoditas_desa';

    protected $primaryKey = 'komoditas_ref';

    protected function casts(): array
    {
        return [
            'luas_area' => 'decimal:2',
            'volume' => 'decimal:2',
            'jumlah_sdm_terlibat' => 'integer',
            'nilai_potensi_desa' => 'decimal:2',
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
