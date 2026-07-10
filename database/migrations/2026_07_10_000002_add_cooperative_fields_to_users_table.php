<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('cooperative_id')
                ->nullable()
                ->after('id')
                ->constrained('cooperatives')
                ->nullOnDelete();
            $table->string('phone_number')->nullable()->after('email');
            $table->string('role')->default('member')->after('phone_number');
            $table->string('conversation_state')->nullable()->after('role');
            $table->timestamp('joined_at')->nullable()->after('conversation_state');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('cooperative_id');
            $table->dropColumn([
                'phone_number',
                'role',
                'conversation_state',
                'joined_at',
            ]);
        });
    }
};
