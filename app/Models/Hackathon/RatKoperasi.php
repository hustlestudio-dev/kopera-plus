<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class RatKoperasi extends HackathonModel
{
    protected $table = 'rat_koperasi';

    protected $primaryKey = 'rat_sample_id';

    protected function casts(): array
    {
        return [
            'tahun_buku' => 'integer',
            'jumlah_peserta_rat' => 'integer',
            'tanggal_rat' => 'datetime',
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
