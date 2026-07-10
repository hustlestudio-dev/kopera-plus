<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class CommerceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(?SeedContext $context = null): void
    {
        $context ??= new SeedContext;

        DB::transaction(function () use ($context): void {
            $now = Carbon::now();

            $context->productId = DB::table('products')->insertGetId([
                'cooperative_id' => $context->cooperativeId,
                'name' => 'Beras Premium 5kg',
                'stock' => 50,
                'price' => 75000,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            $context->orderId = DB::table('orders')->insertGetId([
                'user_id' => $context->userId,
                'cooperative_id' => $context->cooperativeId,
                'fulfillment_type' => 'pickup',
                'estimated_delivery_fee' => 0,
                'status' => 'confirmed',
                'confirmed_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            DB::table('order_items')->insert([
                'order_id' => $context->orderId,
                'product_id' => $context->productId,
                'quantity' => 1,
                'price_at_order' => 75000,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        });
    }
}
