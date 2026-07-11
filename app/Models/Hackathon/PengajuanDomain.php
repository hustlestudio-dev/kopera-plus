<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class PengajuanDomain extends HackathonModel
{
    protected $table = 'pengajuan_domain';

    protected $primaryKey = 'domain_ref';

    protected function casts(): array
    {
        return [
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
