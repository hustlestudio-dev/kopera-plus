<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $context = new SeedContext;

        (new CooperativeSeeder)->run($context);
        (new MemberSeeder)->run($context);
        (new CommerceSeeder)->run($context);
        (new LoyaltySeeder)->run($context);
        (new RatSeeder)->run($context);
        (new CommunitySeeder)->run($context);
    }
}
