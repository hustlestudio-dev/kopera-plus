<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class ModalKoperasi extends HackathonModel
{
    protected $table = 'modal_koperasi';

    protected $primaryKey = 'modal_ref';

    protected function casts(): array
    {
        return [
            'jumlah' => 'decimal:2',
            'tanggal_diterima' => 'datetime',
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
