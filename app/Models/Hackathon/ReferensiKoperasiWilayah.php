<?php

namespace App\Models\Hackathon;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Read-only: committee dump.
 */
class ReferensiKoperasiWilayah extends HackathonModel
{
    protected $table = 'referensi_koperasi_wilayah';

    protected $primaryKey = 'koperasi_ref';

    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }

    public function wilayah(): BelongsTo
    {
        return $this->belongsTo(ReferensiWilayah::class, 'kode_wilayah', 'kode_wilayah');
    }
}
