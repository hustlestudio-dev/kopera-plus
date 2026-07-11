# Arsitektur KOPERA-PLUS

## Ikhtisar

KOPERA-PLUS (KOPERA AI) adalah platform *engagement* koperasi berbasis AI untuk **Hackathon Kementerian Koperasi** — **Tema 3: Pemberdayaan Masyarakat / *Community Engagement***. Platform menjembatani tiga peran: *Explorer* (masyarakat/warga), *Member* (anggota koperasi), dan *Administrator* (pengurus/wilayah). Tujuannya meningkatkan pemahaman, partisipasi, dan transaksi anggota lewat AI yang hadir di seluruh *member journey* — dari *onboarding* hingga tata kelola (e-RAT).

Stack (terverifikasi dari `composer.json`, `package.json`, `README.md`):

| Layer | Teknologi (implementasi nyata) |
|-------|--------------------------------|
| Frontend | Inertia.js v3 + React 19 + TypeScript, Tailwind CSS v4 |
| Admin | Flux UI (Livewire v4) |
| Backend | Laravel 13 (PHP 8.3) |
| Auth | Laravel Fortify |
| RBAC | Spatie Laravel Permission + enum `UserRole` / `TeamRole` / `UserPermission` / `TeamPermission` |
| Routing | Wayfinder (route bertipe) |
| Engagement | `kstmostofa/laravel-whatsapp` (Meta Cloud API + whatsapp-web.js), tabel `wa_*` |
| Database | PostgreSQL (produksi/live), SQLite (dev), Eloquent ORM |
| AI | Heuristik *client-side* (mock) saat ini; integrasi LLM direncanakan |
| Tooling | Laravel Boost MCP, Pint, PHPUnit, ESLint, Prettier |

> Peringatan: dashboard saat ini **statis / *hardcoded***, belum terhubung ke PostgreSQL. Lihat bagian *Gap Saat Ini* di bawah dan `docs/data-model.md`.

## Alur Request (Flowchart)

```mermaid
flowchart TD
    U[Warga / Anggota / Pengurus] -->|HTTP request| MW[Middleware Stack]

    subgraph MW[Middleware]
        AUTH[auth / session Fortify] --> ROLE[role: spatie<br/>explorer|member|administrator]
        ROLE --> TEAM[EnsureTeamMembership<br/>slug -> Team]
        TEAM --> HIN[HandleInertiaRequests<br/>share auth + roles]
        HIN --> HAPP[HandleAppearance]
        HAPP --> HLOC[HandleLocale]
        HLOC --> SETDEF[SetTeamUrlDefaults]
    end

    MW -->|role: administrator| ADMIN[/admin-dashboard]
    MW -->|role: explorer| EXP[/explorer-dashboard]
    MW -->|role: member| MEMB[/current_team/dashboard]
    MEMB --> WS[/workspace]
    MEMB --> ASST[/assistant]

    EXP --> STATIC1[(Data STATIS<br/>coop / product)]
    ADMIN --> KPI[(KPI STATIS<br/>+ rekomendasi AI)]
    ASST --> CART[(Keranjang AI STATIS)]

    ADMIN -.baca.-> PG[(PostgreSQL<br/>dump SIMKOPDES)]
    MEMB -.baca.-> PG
    EXP -.baca.-> PG

    subgraph CH[Channel Engagement]
        WA[WhatsApp<br/>kstmostofa/laravel-whatsapp]
        WA --> WAT[(wa_sessions<br/>wa_messages<br/>wa_contacts)]
    end

    U <-->|notifikasi / reminder| WA
```

## Breakdown Layer

### Frontend
- **Halaman Inertia (React 19 + TS)** di `resources/js/pages/`:
  - `onboarding.tsx` — pemilih 3 peran (Explorer / Member / Administrator).
  - `explorer-dashboard.tsx` — direktori koperasi & produk (data STATIS).
  - `dashboard.tsx` — *hub* anggota: *community feed*, *post*, *voting proposal*, *AI chat* (STATIS).
  - `workspace.tsx` — komersial anggota.
  - `assistant.tsx` — *AI shopping cart* / diskon / subtotal / total (STATIS).
  - `admin-dashboard.tsx` — KPI (Anggota Aktif, Baru Bulan Ini, Transaksi, Pendapatan) + rekomendasi AI (STATIS *hardcoded*).
  - `settings/*` — profil, keamanan, tampilan.
- **Komponen bersama** di `resources/js/components/` (app-shell, sidebar, team-switcher, `PrototypeHud`, dll).
- **Gating client** di `resources/js/lib/permissions.ts` (`ROLE`, `ROUTE_ROLES`, `canAccess()`).
- **Admin** memakai Flux (Livewire v4) — terpisah dari pohon Inertia React.

### Backend
- **Routes**: `routes/web.php` (welcome, dashboard role-scoped, workspace, assistant, settings lewat `routes/settings.php`).
- **Controllers**: `App\Http\Controllers\DashboardController` (render `{current_team}/dashboard`); `App\Http\Controllers\Teams\TeamInvitationController`.
- **Fortify Actions**: `app/Actions/Fortify/` (CreateNewUser, UpdateUserProfileInformation, dll).
- **Teams Actions**: aksi manajemen wilayah koperasi (CreateTeam, InviteTeamMember, dll).
- **Policies**: otorisasi level resource.
- **Middleware** (`app/Http/Middleware/`): `EnsureTeamMembership`, `EnsureUserRole`, `HandleInertiaRequests`, `HandleAppearance`, `HandleLocale`, `SetTeamUrlDefaults`.
- **Enums**: `app/Enums/UserRole` (administrator/explorer/member), `TeamRole` (owner/admin/member), `UserPermission`, `TeamPermission`.
- **Data classes**: DTO / kelas data pembantu.

### Data
- **PostgreSQL dump** dari panitia: `docs/backup-hackathon_2026-202607101855.sql` (referensi SIMKOPDES, ~30 tabel di-*join* via `koperasi_ref`). Lihat `docs/data-model.md`.
- **Migrasi aplikasi** (`database/migrations/`):
  - `users` / `teams` / `permission_tables` (Spatie).
  - `wa_sessions`, `wa_messages`, `wa_contacts` (WhatsApp).
  - `users.role` (kolom peran platform).

### AI
- Saat ini **heuristik *client-side*** (mock) di `dashboard.tsx` / `assistant.tsx` / `admin-dashboard.tsx`. Tidak ada pemanggilan LLM nyata.
- Sentuh *touchpoint* AI dipetakan di PRD (awareness -> onboarding -> aktivasi -> engagement -> tata kelola -> antar-koperasi), tapi belum diimplementasikan end-to-end.

### Cross-cutting
- **Wayfinder**: fungsi route bertipe di `@/actions` & `@/routes`.
- **Pint**: formatter PHP (`vendor/bin/pint`).
- **Tests**: PHPUnit di `tests/` (fitur & unit).

## Role-Gating End-to-End

Gating berjalan di dua sisi yang harus sinkron:

**Server (Laravel)** — `routes/web.php`:

```php
Route::middleware('role:administrator')->group(function () {
    Route::inertia('/admin-dashboard', 'admin-dashboard')->name('admin.dashboard');
});

Route::middleware('role:explorer|administrator')->group(function () {
    Route::inertia('/explorer-dashboard', 'explorer-dashboard')->name('explorer.dashboard');
});

Route::get('{current_team}/dashboard', [DashboardController::class, 'show'])
    ->middleware(['auth', 'role:member']);
// + /workspace, /assistant (role:member|administrator)
```

`role:` disediakan oleh Spatie (`EnsureUserRole` adalah fallback programatik: `abort(403)` bila `! $user->hasAnyRole($roles)`). `EnsureTeamMembership` memvalidasi kepemilikan *slug* wilayah dan memanggil `switchTeam()`. `HandleInertiaRequests` mem-*share* `auth.user.roles` & `auth.user.permissions` ke props Inertia.

**Client (React)** — `resources/js/lib/permissions.ts`:

- `ROUTE_ROLES` memetakan `href -> roles` yang **harus mencerminkan** grup `role:` di server.
- `usePermissions()` membaca `auth.user.roles/permissions` lalu menyediakan `canAccess(href)` — link gated tidak pernah dirender untuk peran yang akan kena 403.
- `roleHomePath()` mencerminkan `UserRole::homePath()` (administrator -> `/admin-dashboard`, explorer -> `/explorer-dashboard`, member -> `/{slug}/dashboard`) supaya *landing* pasca-login tidak *drift*.

Aturan emas: setiap perubahan di `role:` server **wajib** dicerminkan di `ROUTE_ROLES` client.

## Gap Saat Ini: Data Statis vs PostgreSQL

Dashboard saat ini **mock** — nilai KPI (`4,821`, `Rp24.8M`, dll), direktori koperasi/produk, keranjang, dan rekomendasi AI semuanya *hardcoded* di komponen React. Live app memakai PostgreSQL, tapi repo dashboard belum di-*wire* ke dump SIMKOPDES.

Implikasi & langkah penutupan (detail tabel & query di `docs/data-model.md`):

- `{current_team}/dashboard`, `/explorer-dashboard`, `/admin-dashboard` harus mengambil data lewat controller Eloquent ke tabel `profil_koperasi`, `anggota_koperasi`, `transaksi_penjualan`, `rat_koperasi`, dll.
- **Jangan *fake* SHU**: `rat_koperasi` hanya punya ringkasan teks keuangan (`laporan_posisi_keuangan`, `laporan_hasil_usaha`, `rapb_*`) — tidak ada kolom numerik SHU. Estimasi/dalami, jangan dibuat-buat.
- **Field `rating` eksplorer tidak ada** di dump — ganti dengan proksi (volume transaksi / jumlah anggota) atau hapus.
- **Gamifikasi (poin/level/badge)** bukan bagian dump — butuh tabel aplikasi baru.
- **Privasi**: NIK / no HP / email sudah di-*mask* di dump; jangan pernah tampilkan PII mentah, hanya agregat.
