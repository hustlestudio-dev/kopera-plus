<?php

namespace App\Ai\Tools;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class CreateOrder
{
    public function __construct(private readonly int $cooperativeId) {}

    /**
     * @param array{
     *     user_id: int,
     *     delivery_method: string,
     *     delivery_address?: string|null,
     *     delivery_fee?: int,
     *     items: array<int, array{product_id: int, quantity: int}>
     * } $payload
     * @return array{created: bool, order_id?: int, message: string}
     */
    public function handle(array $payload): array
    {
        try {
            $orderId = DB::transaction(function () use ($payload): int {
                $products = DB::table('products')
                    ->where('cooperative_id', $this->cooperativeId)
                    ->where('is_active', true)
                    ->whereIn('id', collect($payload['items'])->pluck('product_id'))
                    ->lockForUpdate()
                    ->get()
                    ->keyBy('id');

                $subtotal = 0;

                foreach ($payload['items'] as $item) {
                    $product = $products->get($item['product_id']);

                    if (! $product || $product->stock < $item['quantity']) {
                        throw new \RuntimeException('Stok tidak cukup.');
                    }

                    $subtotal += $product->price * $item['quantity'];
                }

                $orderId = (int) DB::table('orders')->insertGetId([
                    'cooperative_id' => $this->cooperativeId,
                    'user_id' => $payload['user_id'],
                    'delivery_method' => $payload['delivery_method'],
                    'delivery_address' => $payload['delivery_address'] ?? null,
                    'delivery_fee' => $payload['delivery_fee'] ?? 0,
                    'subtotal' => $subtotal,
                    'total' => $subtotal + (int) ($payload['delivery_fee'] ?? 0),
                    'status' => 'confirmed',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                foreach ($payload['items'] as $item) {
                    $product = $products->get($item['product_id']);
                    $lineTotal = $product->price * $item['quantity'];

                    DB::table('order_items')->insert([
                        'order_id' => $orderId,
                        'product_id' => $product->id,
                        'quantity' => $item['quantity'],
                        'unit_price' => $product->price,
                        'line_total' => $lineTotal,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    DB::table('products')->where('id', $product->id)->update([
                        'stock' => $product->stock - $item['quantity'],
                        'updated_at' => now(),
                    ]);
                }

                DB::table('points_ledger')->insert([
                    'cooperative_id' => $this->cooperativeId,
                    'user_id' => $payload['user_id'],
                    'source' => 'transaksi',
                    'points' => max(1, intdiv($subtotal, 10000)),
                    'reference_type' => 'order',
                    'reference_id' => $orderId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                return $orderId;
            });

            return ['created' => true, 'order_id' => $orderId, 'message' => 'Order berhasil dibuat.'];
        } catch (Throwable $throwable) {
            Log::warning('AI create order failed', ['error' => $throwable->getMessage()]);

            return ['created' => false, 'message' => 'Maaf, data sedang tidak tersedia. Coba beberapa saat lagi atau hubungi pengurus.'];
        }
    }
}
