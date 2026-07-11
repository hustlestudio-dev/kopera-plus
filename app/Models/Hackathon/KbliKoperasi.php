<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class KbliKoperasi extends HackathonModel
{
    protected $table = 'kbli_koperasi';

    protected $primaryKey = '__row_id';

    protected function casts(): array
    {
        return [
            'tahun_kbli' => 'integer',
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
