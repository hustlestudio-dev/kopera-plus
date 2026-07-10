<?php

namespace Database\Seeders;

final class SeedContext
{
    public function __construct(
        public int $cooperativeId = 0,
        public int $userId = 0,
        public int $productId = 0,
        public int $orderId = 0,
        public int $badgeId = 0,
        public int $ratAgendaId = 0,
        public int $ratAgendaItemId = 0,
        public int $communityPostId = 0,
    ) {}
}
