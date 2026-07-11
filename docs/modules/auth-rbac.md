# Modul Auth & RBAC — KOPERA-PLUS

Modul autentikasi (Laravel Fortify) dan otorisasi tingkat platform (Spatie
`laravel-permission` + enum `UserRole`). Otorisasi tingkat wilayah (`Team`)
dokumentasikan terpisah di `docs/modules/teams-multitenant.md`.

Sumber kebenaran tunggal seluruh model peran/izin: `docs/role-permission.md`.

## 1. Autentikasi (Laravel Fortify)

Penanganan login, registrasi, verifikasi email, reset password, dan 2FA
sepenuhnya diserahkan ke Fortify. Kode aplikasi hanya mengisi kelakuan
kustom lewat action kelas.

| Fitur | Status | File implementasi |
|-------|:------:|-------------------|
| Login | [x] | `Fortify::authenticate` (bawaan) |
| Registrasi | [x] | `app/Actions/Fortify/CreateNewUser.php` |
| Email verification | [x] | Middleware `verified` (bawaan) |
| Reset password | [x] | `app/Actions/Fortify/ResetUserPassword.php` |
| Update password | [x] | `app/Actions/Fortify/UpdateUserPassword.php` (bawaan wiring) |
| Two-factor auth (2FA) | [x] | Kolom migrasi `2026_07_11_000000_add_two_factor_columns_to_users_table.php` |
| Update profil | [x] | `app/Actions/Fortify/UpdateUserProfileInformation.php` (bawaan wiring) |

Catatan: kolom 2FA ditambahkan di `users` lewat migrasi
`2026_07_11_000000_add_two_factor_columns_to_users_table.php`
(`two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`).
`User` memakai `Spatie\Permission\Traits\HasRoles` dan `App\Concerns\HasTeams`.

### `CreateNewUser` (registrasi)

`app/Actions/Fortify/CreateNewUser.php`:

- Validasi input profil + `role` wajib, di-`Rule::in(array_column(UserRole::assignable(), 'value'))`.
- Ambil/ciptakan Spatie `Role` berdasar nama: `Role::firstOrCreate(['name' => $input['role'], 'guard_name' => 'web'])`.
- Dalam transaksi: buat `User`, panggil `CreateTeam` untuk wilayah pribadi
  (`"<name>'s Wilayah Koperasi"`, `isPersonal: true`), lalu `assignRole($role)`.

Efek: peran platform disimpan sebagai Spatie `Role` (bukan sekadar enum),
supaya middleware `role:` dan `$user->hasRole()` berfungsi tanpa query tambahan.

## 2. Arsitektur RBAC — dua lapisan

Ada dua sistem otorisasi yang **berdiri sendiri** dan belum direkonsiliasi:

| Lapisan | Konsep backend | Peran | Diperkuat oleh |
|---------|----------------|-------|----------------|
| Platform (akun) | `UserRole` enum + Spatie `Role` rows | `Explorer` / `Member` / `Administrator` | middleware `role:` (Spatie), `UserRole::homePath()` |
| Wilayah (team) | `Team` + `TeamRole` enum | `Owner` / `Admin` / `Member` | `TeamPolicy`, `hasTeamPermission()` |

- **Platform role** = "siapa kamu" di seluruh akun (tier). Tersimpan sebagai
  Spatie `Role` (`guard_name = web`). Kapabilitas tersimpan sebagai Spatie
  `Permission` rows (diseed `RoleSeeder`).
- **Team role** = jabatanmu di satu wilayah koperasi tertentu. Ditenagai enum
  `TeamRole` + tabel pivot `team_members` (lewat model `Membership`). Bukan
  Spatie.
- Kedua lapisan **independen**: peran platform tidak menyiratkan peran wilayah,
  dan sebaliknya.

Model kapabilitas platform (lihat `docs/role-permission.md` section 2 untuk
matriks lengkap):

- **Explorer / masyarakat**: jelajah, beli, transaksi produk, dan menabung
  (setor/tarik). Hanya area explorer + tabungan.
- **Member / anggota**: hanya modul E-RAT. Tanpa toko, tanpa tabungan.
- **Administrator**: superuser — setiap kapabilitas. **Tidak pernah
  self-registered**, hanya lewat seeder/artisan (developer).

## 3. Enum & Middleware

### Enum

- `app/Enums/UserRole.php` — `Explorer`, `Member`, `Administrator`.
  - `permissions(): array<UserPermission>` — peta kapabilitas per peran.
  - `homePath(User): string` — tujuan landing per peran (sumber kebenaran
    server tunggal untuk redirect pascalogin).
  - `orderedForLanding(): array<self>` — prioritas landing (admin dulu).
  - `assignable(): array` — peran yang boleh self-service; **mengecualikan
    `Administrator`** (aman dari klaim admin anonim).
- `app/Enums/TeamRole.php` — `Owner`, `Admin`, `Member` (lihat modul teams).
- `app/Enums/UserPermission.php` — kapabilitas platform
  (`profile:view`, `shop:browse`, `erat:access`, `admin:users`, dst.).
- `app/Enums/TeamPermission.php` — kapabilitas wilayah
  (`team:update`, `member:add`, `invitation:create`, dst.).

### Middleware (platform)

- `app/Http/Middleware/EnsureUserRole.php` — `abort(403)` bila user tak punya
  salah satu Spatie role yang diberikan (`$user->hasAnyRole($roles)`).
  - `ponytail`: Spatie `role:` middleware sudah menutupi kasus umum di
    `routes/web.php`; kelas ini disimpan untuk pengecekan inline/programatik
    dan dapat dibuang bila semua guard jadi route-middleware.
- Pengecekan utama lewat middleware Spatie `role:` di `routes/web.php`:
  - `role:administrator` -> `/admin-dashboard`
  - `role:explorer|administrator` -> `/explorer-dashboard`
  - `role:member|administrator` -> `{current_team}/dashboard`, `/workspace`,
    `/assistant`
- `app/Http/Middleware/EnsureTeamMembership.php` — untuk area wilayah
  (detail di modul teams).

## 4. Gating sisi klien (`resources/js/lib/permissions.ts`)

Sumber kebenaran tunggal peran platform di sisi klien:

- `ROLE` — slug peran platform, cermin `UserRole` (`explorer` / `member` /
  `administrator`).
- `ROUTE_ROLES` — `path -> roles[]` yang diizinkan, cermin grup `role:` di
  `routes/web.php`. Path tak terdaftar = publik/bebas.
- `roleHomePath(roles, teamSlug)` — cermin klien `UserRole::homePath()`,
  dipakai `welcome.tsx` agar tombol landing tak drift dari server.
- `usePermissions()` — `hasRole`, `hasAnyRole`, `hasPermission`,
  `canAccess(href)` (baca `auth.user.roles` / `auth.user.permissions` dari
  `HandleInertiaRequests`).

Aturan: link navigasi hanya dirender bila `canAccess(item.href)` true; route
`role:x|y` baru wajib punya pasangan sama di `ROUTE_ROLES`.

## 5. KEGAP (dari `docs/role-permission.md`)

| ID | Kondisi | Severity | Perbaikan |
|----|---------|:--------:|-----------|
| A | Permission/platform tidak pernah di-seed — tabel `permissions` dan `role_has_permissions` kosong; peran hanya bisa di-enforce lewat nama, bukan `$user->can()`. | [tinggi] | Seed baris `Permission` + `syncPermissions()` dari `UserRole::permissions()` lewat `RoleSeeder`. Sekarang idempoten (`firstOrCreate` per `UserPermission::cases()`). |
| B | `administrator` dulunya dapat di-self-assign saat registrasi (lubang keamanan). | [kritis] | `UserRole::assignable()` menolak `Administrator`; `CreateNewUser` validasi `role` terhadap `assignable()`. Admin hanya lewat `UserSeeder`/artisan. Dikunci `RoleSeederTest::test_administrator_is_not_self_assignable`. |
| C | Drift antara `CreateNewUser` dan `UserRole` — peran dibuat lewat `Role::firstOrCreate` (string) sementara enum `UserRole` memetakan kapabilitas. | [sedang] | `UserRole::permissions()` jadi satu-satunya peta kapabilitas; `RoleSeeder` sync dari sana, bukan hardcode di action. |
| D | Belum ada auth berbasis kapabilitas — route masih gate di **nama peran** (`role:`), bukan `$user->can()`. | [sedang] | Saat pindah ke capability gating, ganti grup `role:` ke middleware `permission:` (daftarkan di `bootstrap/app.php`) atau Gate/Policy, lalu update `ROUTE_ROLES` / `hasPermission`. (Sistem kapabilitas sudah di-seed dan siap.) |
| F | View registrasi menghardcode opsi `administrator` di UI. | [rendah] | Tampilkan hanya `UserRole::assignable()` di `resources/js/pages/auth/register.tsx` (`ROLE_COPY`) dan `onboarding.tsx`, bukan literal `administrator`. |

Dua sistem paralel (peran platform Spatie vs peran wilayah enum-driven +
`TeamPolicy`) **belum direkonsiliasi** — penambahan guard baru harus sadar
lapisan mana yang berlaku.

## 6. Langkah berikutnya (tutup gap)

1. `UserRole::assignable()` sudah mengecualikan `administrator` — pastikan UI
   registrasi/onboarding juga memakai `assignable()`, bukan literal (tutup F).
2. Seed permission platform (sudah di `RoleSeeder` — pastikan dijalankan di
   seed/CI) (tutup A).
3. Gate lewat `$user->can()` / `permission:` middleware dananya sudah siap;
   migrasikan route satu per satu sambil sync `ROUTE_ROLES` (tutup D).
4. Jaga drift: semua keputusan peran->kapabilitas lewat `UserRole::permissions()`
   dan `TeamRole::permissions()`, bukan string hardcode (tutup C).

## 7. Verifikasi

- `tests/Feature/RoleSeederTest` — seeding idempoten, lampiran izin per peran,
  matriks kapabilitas, admin tidak self-assignable.
- `tests/Feature/UserSeederTest` — tiap demo user punya wilayah pribadi, satu
  peran platform, kapabilitas sesuai peran.
- `tests/Feature/ProductionRoutesTest` — redirect guest, member hanya area
  member, explorer hanya explorer dashboard, admin hanya admin.
