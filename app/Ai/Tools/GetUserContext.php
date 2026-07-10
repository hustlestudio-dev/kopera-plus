<?php

namespace App\Ai\Tools;

use Illuminate\Support\Facades\DB;

class GetUserContext
{
    public function __construct(
        private readonly string $whatsappNumber,
        private readonly ?int $cooperativeId,
    ) {}

    /**
     * @return array{
     *     exists: bool,
     *     role: string|null,
     *     user_id: int|null,
     *     cooperative_id: int|null,
     *     name: string|null
     * }
     */
    public function handle(): array
    {
        $user = DB::table('users')
            ->where('phone_number', $this->whatsappNumber)
            ->when($this->cooperativeId, fn ($query) => $query->where('cooperative_id', $this->cooperativeId))
            ->first();

        return [
            'exists' => $user !== null,
            'role' => $user->role ?? null,
            'user_id' => $user->id ?? null,
            'cooperative_id' => $user->cooperative_id ?? $this->cooperativeId,
            'name' => $user->name ?? null,
        ];
    }
}
