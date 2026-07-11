<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class AkunBankKoperasi extends HackathonModel
{
    protected $table = 'akun_bank_koperasi';

    protected $primaryKey = 'akun_bank_ref';

    protected function casts(): array
    {
        return [
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
