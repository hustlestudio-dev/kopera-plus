<?php

namespace App\Ai\Tools;

use Illuminate\Support\Facades\DB;

class CheckProductStock
{
    public function __construct(private readonly int $cooperativeId) {}

    /**
     * @return array{found: bool, product: array{name: string, stock: int, unit: string, price: int, id: int}|null}
     */
    public function handle(string $query): array
    {
        $product = DB::table('products')
            ->where('cooperative_id', $this->cooperativeId)
            ->where('is_active', true)
            ->where('name', 'like', '%'.trim($query).'%')
            ->orderByDesc('stock')
            ->first();

        if (! $product) {
            $product = DB::table('products')
                ->where('cooperative_id', $this->cooperativeId)
                ->where('is_active', true)
                ->orderByDesc('stock')
                ->first();
        }

        if (! $product) {
            return ['found' => false, 'product' => null];
        }

        return [
            'found' => true,
            'product' => [
                'id' => (int) $product->id,
                'name' => $product->name,
                'stock' => (int) $product->stock,
                'unit' => $product->unit,
                'price' => (int) $product->price,
            ],
        ];
    }
}
