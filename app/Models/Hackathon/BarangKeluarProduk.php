<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class BarangKeluarProduk extends HackathonModel
{
    protected $table = 'barang_keluar_produk';

    protected $primaryKey = 'transaksi_sample_id';

    protected function casts(): array
    {
        return [
            'jumlah_keluar' => 'decimal:2',
            'harga' => 'decimal:2',
            'total_nilai' => 'decimal:2',
            'tanggal_keluar' => 'datetime',
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
