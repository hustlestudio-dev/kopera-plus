<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class AsetKoperasi extends HackathonModel
{
    protected $table = 'aset_koperasi';

    protected $primaryKey = 'aset_ref';

    protected function casts(): array
    {
        return [
            'luas_lahan' => 'decimal:2',
            'panjang_lahan' => 'decimal:2',
            'lebar_lahan' => 'decimal:2',
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
