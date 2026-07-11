<?php

namespace Database\Seeders;

use App\Actions\Teams\CreateTeam;
use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Shared password for every seeded demo account.
     */
    private const PASSWORD = 'HustleJuara#123';

    /**
     * One demo account per platform role. Email is derived from the role slug
     * (e.g. `member@mail.com`). Rerunning updates existing rows instead of
     * inserting duplicates, and role/personal-team assignments are guarded so
     * repeated runs stay side-effect free.
     *
     * @var array<int, array{role: UserRole, name: string}>
     */
    private const ACCOUNTS = [
        ['role' => UserRole::Explorer, 'name' => 'Penjelajah Kopera'],
        ['role' => UserRole::Member, 'name' => 'Anggota Kopera'],
        ['role' => UserRole::Administrator, 'name' => 'Administrator Kopera'],
    ];

    /**
     * Seed the role-based demo accounts.
     */
    public function run(): void
    {
        // Roles must exist before they can be assigned.
        $this->call(RoleSeeder::class);

        $createTeam = new CreateTeam;

        foreach (self::ACCOUNTS as $account) {
            $email = $account['role']->value.'@mail.com';

            $user = User::updateOrCreate(
                ['email' => $email],
                [
                    'name' => $account['name'],
                    'password' => self::PASSWORD,
                    'email_verified_at' => now(),
                ],
            );

            $roleSlug = $account['role']->value;

            if (! $user->hasRole($roleSlug)) {
                $user->assignRole($roleSlug);
            }

            // A personal team lets the member/administrator dashboards resolve.
            if (! $user->ownedTeams()->where('is_personal', true)->exists()) {
                $createTeam->handle($user, $user->name."'s Wilayah Koperasi", isPersonal: true);
            }
        }
    }
}
