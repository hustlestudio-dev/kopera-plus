<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            if (! Schema::hasColumn('users', 'phone_number')) {
                $table->string('phone_number')->nullable()->unique()->after('email');
            }

            if (! Schema::hasColumn('users', 'cooperative_id')) {
                $table->unsignedBigInteger('cooperative_id')->nullable()->after('phone_number');
            }

            if (! Schema::hasColumn('users', 'role')) {
                $table->string('role')->default('anggota')->after('cooperative_id');
            }

            if (! Schema::hasColumn('users', 'two_factor_secret')) {
                $table->text('two_factor_secret')->nullable()->after('password');
            }

            if (! Schema::hasColumn('users', 'two_factor_recovery_codes')) {
                $table->text('two_factor_recovery_codes')->nullable()->after('two_factor_secret');
            }

            if (! Schema::hasColumn('users', 'two_factor_confirmed_at')) {
                $table->timestamp('two_factor_confirmed_at')->nullable()->after('two_factor_recovery_codes');
            }
        });

        if (! Schema::hasTable('cooperatives')) {
            Schema::create('cooperatives', function (Blueprint $table): void {
                $table->id();
                $table->string('name');
                $table->string('slug')->unique();
                $table->string('whatsapp_number')->nullable()->unique();
                $table->string('province')->nullable();
                $table->string('city')->nullable();
                $table->unsignedInteger('total_members')->default(0);
                $table->unsignedInteger('quorum_threshold_percent')->default(50);
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        Schema::table('users', function (Blueprint $table): void {
            if (Schema::hasColumn('users', 'cooperative_id')) {
                $table->foreign('cooperative_id')->references('id')->on('cooperatives')->nullOnDelete();
            }
        });

        if (! Schema::hasTable('member_profiles')) {
            Schema::create('member_profiles', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('cooperative_id')->constrained()->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->unique()->constrained()->nullOnDelete();
                $table->string('phone_number')->nullable()->index();
                $table->string('name');
                $table->string('location')->nullable();
                $table->string('occupation')->nullable();
                $table->string('interest')->nullable();
                $table->string('onboarding_status')->default('draft');
                $table->json('meta')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('member_levels')) {
            Schema::create('member_levels', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('cooperative_id')->constrained()->cascadeOnDelete();
                $table->foreignId('user_id')->constrained()->cascadeOnDelete();
                $table->unsignedInteger('total_points')->default(0);
                $table->string('level_name')->default('Bronze');
                $table->timestamps();
                $table->unique(['cooperative_id', 'user_id']);
            });
        }

        if (! Schema::hasTable('badges')) {
            Schema::create('badges', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('cooperative_id')->constrained()->cascadeOnDelete();
                $table->string('code');
                $table->string('name');
                $table->string('description')->nullable();
                $table->unsignedInteger('points_threshold')->default(0);
                $table->timestamps();
                $table->unique(['cooperative_id', 'code']);
            });
        }

        if (! Schema::hasTable('member_badges')) {
            Schema::create('member_badges', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('user_id')->constrained()->cascadeOnDelete();
                $table->foreignId('badge_id')->constrained()->cascadeOnDelete();
                $table->timestamps();
                $table->unique(['user_id', 'badge_id']);
            });
        }

        if (! Schema::hasTable('products')) {
            Schema::create('products', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('cooperative_id')->constrained()->cascadeOnDelete();
                $table->string('name');
                $table->string('sku')->nullable()->index();
                $table->unsignedInteger('stock')->default(0);
                $table->string('unit')->default('item');
                $table->unsignedBigInteger('price');
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('orders')) {
            Schema::create('orders', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('cooperative_id')->constrained()->cascadeOnDelete();
                $table->foreignId('user_id')->constrained()->cascadeOnDelete();
                $table->string('delivery_method');
                $table->string('delivery_address')->nullable();
                $table->unsignedBigInteger('delivery_fee')->default(0);
                $table->unsignedBigInteger('subtotal')->default(0);
                $table->unsignedBigInteger('total')->default(0);
                $table->string('status')->default('draft');
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('order_items')) {
            Schema::create('order_items', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('order_id')->constrained()->cascadeOnDelete();
                $table->foreignId('product_id')->constrained()->cascadeOnDelete();
                $table->unsignedInteger('quantity');
                $table->unsignedBigInteger('unit_price');
                $table->unsignedBigInteger('line_total');
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('points_ledger')) {
            Schema::create('points_ledger', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('cooperative_id')->constrained()->cascadeOnDelete();
                $table->foreignId('user_id')->constrained()->cascadeOnDelete();
                $table->string('source');
                $table->integer('points');
                $table->string('reference_type')->nullable();
                $table->unsignedBigInteger('reference_id')->nullable();
                $table->timestamps();
                $table->index(['cooperative_id', 'user_id']);
            });
        }

        if (! Schema::hasTable('rat_agendas')) {
            Schema::create('rat_agendas', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('cooperative_id')->constrained()->cascadeOnDelete();
                $table->string('title');
                $table->dateTime('scheduled_at');
                $table->text('summary')->nullable();
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('rat_agenda_items')) {
            Schema::create('rat_agenda_items', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('rat_agenda_id')->constrained()->cascadeOnDelete();
                $table->string('title');
                $table->text('details')->nullable();
                $table->boolean('is_votable')->default(false);
                $table->boolean('is_secret_ballot')->default(false);
                $table->unsignedInteger('sort_order')->default(0);
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('rat_ai_summaries')) {
            Schema::create('rat_ai_summaries', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('rat_agenda_id')->constrained()->cascadeOnDelete();
                $table->longText('summary');
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('rat_attendances')) {
            Schema::create('rat_attendances', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('rat_agenda_id')->constrained()->cascadeOnDelete();
                $table->foreignId('user_id')->constrained()->cascadeOnDelete();
                $table->timestamp('attended_at');
                $table->timestamps();
                $table->unique(['rat_agenda_id', 'user_id']);
            });
        }

        if (! Schema::hasTable('rat_votes')) {
            Schema::create('rat_votes', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('rat_agenda_item_id')->constrained()->cascadeOnDelete();
                $table->foreignId('user_id')->constrained()->cascadeOnDelete();
                $table->string('choice');
                $table->timestamp('voted_at');
                $table->timestamps();
                $table->unique(['rat_agenda_item_id', 'user_id']);
            });
        }

        if (! Schema::hasTable('rat_result_summaries')) {
            Schema::create('rat_result_summaries', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('rat_agenda_id')->constrained()->cascadeOnDelete();
                $table->longText('summary');
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('community_posts')) {
            Schema::create('community_posts', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('cooperative_id')->constrained()->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
                $table->string('title');
                $table->longText('content');
                $table->string('visibility')->default('public');
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('cross_kopdes_insights')) {
            Schema::create('cross_kopdes_insights', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('cooperative_id')->constrained()->cascadeOnDelete();
                $table->string('title');
                $table->longText('content');
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('cross_kopdes_insights');
        Schema::dropIfExists('community_posts');
        Schema::dropIfExists('rat_result_summaries');
        Schema::dropIfExists('rat_votes');
        Schema::dropIfExists('rat_attendances');
        Schema::dropIfExists('rat_ai_summaries');
        Schema::dropIfExists('rat_agenda_items');
        Schema::dropIfExists('rat_agendas');
        Schema::dropIfExists('points_ledger');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('products');
        Schema::dropIfExists('member_badges');
        Schema::dropIfExists('badges');
        Schema::dropIfExists('member_levels');
        Schema::dropIfExists('member_profiles');
        Schema::table('users', function (Blueprint $table): void {
            $table->dropForeign(['cooperative_id']);
            $table->dropColumn([
                'phone_number',
                'role',
                'two_factor_secret',
                'two_factor_recovery_codes',
                'two_factor_confirmed_at',
            ]);
            $table->dropColumn('cooperative_id');
        });
        Schema::dropIfExists('cooperatives');
    }
};
