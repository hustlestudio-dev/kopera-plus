<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class AnggotaKoperasi extends HackathonModel
{
    protected $table = 'anggota_koperasi';

    protected $primaryKey = 'anggota_ref';

    protected function casts(): array
    {
        return [
            'tanggal_terdaftar' => 'datetime',
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
