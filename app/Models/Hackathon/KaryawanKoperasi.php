<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class KaryawanKoperasi extends HackathonModel
{
    protected $table = 'karyawan_koperasi';

    protected $primaryKey = 'karyawan_ref';

    protected function casts(): array
    {
        return [
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
