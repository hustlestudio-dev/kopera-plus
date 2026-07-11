<?php

namespace App\Enums;

/**
 * Platform-level permissions (capabilities) for cooperative members.
 *
 * These back the spatie/laravel-permission `Permission` rows seeded by
 * `RoleSeeder`. Authorization at the platform level should prefer
 * `$user->can(UserPermission::...)` over raw role-name checks, so capability
 * (not role identity) drives access.
 *
 * Capability model (see docs/role-permission.md):
 * - Explorer / masyarakat: browse, buy and transact products, and save
 *   (deposit/withdraw savings).
 * - Member / anggota: access ONLY the E-RAT module.
 * - Administrator: full platform management (superuser = every capability).
 */
enum UserPermission: string
{
    // Account & profile - available to every authenticated member.
    case ProfileView = 'profile:view';
    case ProfileUpdate = 'profile:update';

    // Explorer / masyarakat - shopping & savings.
    case ShopBrowse = 'shop:browse';
    case ShopPurchase = 'shop:purchase';
    case ShopTransact = 'shop:transact';
    case SavingsDeposit = 'savings:deposit';
    case SavingsWithdraw = 'savings:withdraw';

    // Member / anggota - E-RAT module only.
    case EratAccess = 'erat:access';

    // Platform administration.
    case AdminUsers = 'admin:users';
    case AdminProducts = 'admin:products';
    case AdminTransactions = 'admin:transactions';
    case AdminSavings = 'admin:savings';
    case AdminErat = 'admin:erat';

    /**
     * Get the display label for the permission.
     */
    public function label(): string
    {
        return match ($this) {
            self::ProfileView => 'Lihat profil',
            self::ProfileUpdate => 'Perbarui profil',
            self::ShopBrowse => 'Jelajahi produk',
            self::ShopPurchase => 'Beli produk',
            self::ShopTransact => 'Transaksi produk',
            self::SavingsDeposit => 'Menabung (setor)',
            self::SavingsWithdraw => 'Tarik tabungan',
            self::EratAccess => 'Akses E-RAT',
            self::AdminUsers => 'Kelola pengguna',
            self::AdminProducts => 'Kelola produk',
            self::AdminTransactions => 'Kelola transaksi',
            self::AdminSavings => 'Kelola tabungan',
            self::AdminErat => 'Kelola E-RAT',
        };
    }
}
