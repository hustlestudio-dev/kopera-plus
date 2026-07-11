<?php

namespace App\Models\Hackathon;

use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * Read-only: committee dump.
 */
class ProfilKoperasi extends HackathonModel
{
    protected $table = 'profil_koperasi';

    protected $primaryKey = 'koperasi_ref';

    protected function casts(): array
    {
        return [
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }

    public function koperasiWilayah(): HasOne
    {
        return $this->hasOne(ReferensiKoperasiWilayah::class, 'koperasi_ref', 'koperasi_ref');
    }
}
