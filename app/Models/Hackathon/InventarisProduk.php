<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class InventarisProduk extends HackathonModel
{
    protected $table = 'inventaris_produk';

    protected $primaryKey = 'inventaris_ref';

    protected function casts(): array
    {
        return [
            'stok' => 'decimal:2',
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
