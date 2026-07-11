<?php

namespace App\Models\Hackathon;

/**
 * Read-only: committee dump.
 */
class GeraiKoperasi extends HackathonModel
{
    protected $table = 'gerai_koperasi';

    protected $primaryKey = 'gerai_ref';

    protected function casts(): array
    {
        return [
            'dibuat_pada' => 'datetime',
            'diperbarui_pada' => 'datetime',
        ];
    }
}
