<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class ReferensiProfilDesa extends HackathonModel
{
    protected $table = 'referensi_profil_desa';

    protected $primaryKey = 'kode_wilayah';

    protected function casts(): array
    {
        return [
            'total_penduduk' => 'integer',
            'penduduk_laki_laki' => 'integer',
            'penduduk_perempuan' => 'integer',
            'anggaran_dana_desa' => 'decimal:2',
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
