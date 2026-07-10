<?php

namespace App\Ai\Tools;

class CalculateDeliveryFee
{
    /**
     * @return array{distance_km: float, fee: int}
     */
    public function handle(?string $destination = null): array
    {
        $distance = $destination === null ? 3.5 : max(1.0, min(15.0, (float) (strlen($destination) % 15 ?: 3)));

        return [
            'distance_km' => $distance,
            'fee' => (int) round($distance * 2500),
        ];
    }
}
