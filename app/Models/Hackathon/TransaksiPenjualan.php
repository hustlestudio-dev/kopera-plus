<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class TransaksiPenjualan extends HackathonModel
{
    protected $table = 'transaksi_penjualan';

    protected $primaryKey = 'transaksi_sample_id';

    protected function casts(): array
    {
        return [
            'total_pembayaran' => 'decimal:2',
            'tanggal_dibuat' => 'datetime',
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
