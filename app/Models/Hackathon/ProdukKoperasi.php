<?php

namespace App\Models\Hackathon;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Read-only: committee dump.
 */
class ProdukKoperasi extends HackathonModel
{
    protected $table = 'produk_koperasi';

    protected $primaryKey = 'produk_sample_id';

    protected function casts(): array
    {
        return [
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }

    public function koperasi(): BelongsTo
    {
        return $this->belongsTo(ProfilKoperasi::class, 'koperasi_ref', 'koperasi_ref');
    }

    public function inventaris(): HasMany
    {
        return $this->hasMany(InventarisProduk::class, 'produk_sample_id', 'produk_sample_id');
    }
}
