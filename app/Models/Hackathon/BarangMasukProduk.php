<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class BarangMasukProduk extends HackathonModel
{
    protected $table = 'barang_masuk_produk';

    protected $primaryKey = 'barang_masuk_ref';

    protected function casts(): array
    {
        return [
            'jumlah_masuk' => 'decimal:2',
            'jumlah_tersedia' => 'decimal:2',
            'harga_beli' => 'decimal:2',
            'harga_jual' => 'decimal:2',
            'total_biaya' => 'decimal:2',
            'tanggal_masuk' => 'datetime',
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
