# Tasklist KOPERA-PLUS — Master Manifest (Swarm-Ready, Verification-Strict)

> Sumber kebenaran = repo ini. Live < repo (perubahan belum di-push, 1 alur dari `main`).
> Dokumen ini = BASE. Detail per-modul ada di `docs/` (`docs/modules/*`, `docs/architecture.md`, `docs/data-model.md`, `docs/ai-disclosure.md`, `docs/localization.md`, `docs/quality-gate.md`).
> Tooling = **bun** (bukan npm) untuk cepat. Cek `docs/quality-gate.md`.
> Bahasa: Bahasa Indonesia. Tanpa emoji. Tanda: `[x]` `[~]` `[ ]` `[!]`.

---

## BAGIAN 0 — ATURAN VERIFIKASI (Anti-Kebohongan)

Ini yang membedakan "beres" asli vs kulitnya saja. **Tidak ada item yang boleh ditandai `[x]` oleh sub-agent yang mengerjakannya.** Hanya orchestrator/verifier yang menandai selesai, SETELAH verifikasi objektif lulus.

Sebuah item = DONE hanya jika SEMUA terpenuhi:
1. **Verification command lulus** — perintah di kolom `Verifikasi` tiap modul benar-benar dijalankan dan hijau (bukan "sudah saya cek").
2. **Pre-commit gate hijau** — `eslint`, `prettier --check`, `tsc`, `pint --test`, `phpstan`, `impeccable` tidak gagal. `react-doctor` dijalankan bila binary lokal ada.
3. **Bukan kulit** — bukti nyata ada: data dari Postgres (bukan hardcode), test ada & lulus, UI menampilkan data asli (bukan placeholder/lorem/angka acak).
4. **Verifier independen** — agent ke-2 (bukan pembuat) jalankan ulang verification command dan konfirmasi.

Larangan keras:
- Sub-agent TIDAK BOLEH menulis `[x]` di tasklist untuk pekerjaannya sendiri.
- Tidak boleh bilang "beres" hanya karena file ada / kompilasi lulus. Kompilasi lulus ≠ fitur jalan.
- Jika verification command tidak bisa dijalankan (env belum siap), status = `[~]` + catat blocker, BUKAN `[x]`.

Format verifikasi tiap modul wajib berisi minimal SATU perintah runnable (test / tinker query / grep / build) yang membuktikan fitur, bukan keberadaan file.

---

## BAGIAN 1 — TOOLING (bun)

Semua perintah JS dijalankan via **bun** (npm lambat). PHP via `php artisan` / `composer` / `vendor/bin/*`.

```sh
# Instalasi dependensi
bun install                       # JS deps (bukan npm install)
composer install                  # PHP deps

# Frontend quality (lokal, sebelum commit)
bun run lint:check                # ESLint
bun run format:check              # Prettier --check resources/
bun run types:check               # tsc --noEmit
bun run impeccable                # impeccable detect resources/

# React optimizer (opsional sampai diinstal)
bun add -D react-doctor           # sekali saja
bun run doctor                    # audit lokal (bunx react-doctor@latest)

# Backend quality
vendor/bin/pint --test --format agent   # style (gagal = ada yg bisa dirapikan)
vendor/bin/phpstan analyse              # static analysis
php artisan test --compact              # test suite

# Pre-commit gate (berjalan otomatis saat git commit)
#   .githooks/pre-commit sudah aktif (git config core.hooksPath=.githooks).
#   Pakai bun; blokir commit bila salah satu check gagal.
#   Bypass darurat SAJA: git commit --no-verify
```

Lockfile: `bun.lockb` (bukan `package-lock.json`). Resource bersama yang wajib di-serialize antar agent: `composer.lock`, `bun.lockb`, `database/migrations`, `pint --dirty`, `.env`, Wayfinder generate (`@/actions`,`@/routes`).

---

## BAGIAN 2 — CARA EKSEKUSI MULTI-SUBAGENT (Cepat & Tepat)

Protokol swarm: `AGENTS.md` (`multi-agent-swarm-coordination`). Satu orchestrator, banyak sub-agent dengan scope file disjoint.

1. **Orchestrator** (PM) pecah tasklist jadi slice independen. Tiap slice = 1 modul = 1 sub-agent.
2. **Claim**: sebelum edit, agent tulis 1 baris ke `.agent-board`:
   `agent-id | glob-file | branch | timestamp`. Dua agent tidak claim glob sama.
3. **Isolasi**: tiap agent = 1 worktree/branch:
   `git worktree add -b feat/kopera/<agent-id> .worktrees/<agent-id> feat/kopera`
   Kerja hanya di file miliknya.
4. **Skill wajib auto-trigger** (sudah terpasang di `.agents/skills/`): `laravel-best-practices` (PHP), `react-best-practices` (React), `inertia-react-development`, `tailwindcss-development`. Agent HARUS memanggil skill sebelum tulis kode (auto-trigger saat deskripsi cocok; kalau ragu panggil eksplisit).
5. **Quality gate sebelum commit** (jalankan di worktree masing-masing):
   `bun run lint:check && bun run format:check && bun run types:check && bun run impeccable && vendor/bin/pint --test --format agent && vendor/bin/phpstan analyse`
   Bila `react-doctor` sudah terpasang: tambah `bun run doctor`.
   Gagal = **jangan commit**. Pre-commit hook juga akan menolak.
6. **Commit atomik** di branch sendiri (`git commit -m "agent-id: ..."`). Jangan `git stash`/`revert` milik agent lain.
7. **Handoff**: agent kembalikan ringkas: file diubah + output verification command (paste nyata, bukan "lulus"). Bukan `[x]`.
8. **Verifier**: orchestrator spawn agent ke-2 (atau cek sendiri) jalankan ulang verification command modul itu. Hanya kalau hijau → orchestrator tandai `[x]`.
9. **Integrasi**: `git merge --no-ff` per branch oleh orchestrator, tes hijau tiap merge. Urutan merge: migrasi/lockfile dulu, lalu shared config, lalu fitur.

---

## BAGIAN 3 — SUBMISSION CHECKLIST (TOR Hackathon Kemenkop)

| Item | Status | Verifikasi |
|------|--------|-----------|
| Repositori kode publik | [x] | URL repo dapat diakses juri |
| `README.md` (install + arsitektur) | [x] | `bun run dev` jalan; isi akurat (bun, bukan npm) |
| `docs/prd.md` (stack revisian + status) | [x] | grep "Revisi stack" ada |
| `docs/quality-gate.md` | [x] | ada + sebutkan bun + react-doctor |
| Pitch deck PDF (10–12 slide) | [ ] | file `docs/pitch-deck.pdf` ada, <=12 slide |
| Demo live URL + kredensial juri | [ ] | URL live kebuka; login 3 role (explorer/member/admin) lancar |
| `docs/ai-disclosure.md` (Aturan J) | [x] | ada + sebutkan alat AI yang dipakai |
| Video demo (opsional <=3 mnt) | [ ] | link unlisted YouTube/Drive |

---

## BAGIAN 4 — MODUL (M1–M16)

Status: `[x]` DONE terverifikasi | `[~]` PARTIAL | `[ ]` TODO | `[!]` BLOCKER.
Catatan status 2026-07-11: M13 (lapisan data) SELESAI & terverifikasi via Postgres; M8 (admin) konsumsi data nyata; M6 (explorer) & M7 (dashboard member) MASIH hardcode/mock — belum menyerap M13.

---

### M1 — Auth & Fortify
- **Tujuan**: warga bisa daftar/masuk aman; 2FA; pilih peran valid.
- **URL**: Fortify `/login`, `/register`, `/forgot-password`, `/reset-password`; `/user/profile`, `/user/security` (2FA, passkey). Middleware `auth`, `verified`.
- **Backend**: `app/Actions/Fortify/CreateNewUser.php` (validasi `role` via `UserRole::assignable()`, default BUKAN administrator), `ResetUserPassword.php`. `app/Models/User.php` (`HasRoles`, `HasTeams`, kolom `two_factor_*`). Migrasi `two_factor`, `role`, `permission`.
- **Frontend**: `resources/js/pages/auth/*`, `resources/js/pages/settings/{profile,security,appearance}.tsx`.
- **UI (anti-slop)**: form bersih, label Bahasa Indonesia, error dari backend (bukan alert generik), loading state tombol submit. JANGAN "Welcome to our amazing platform".
- **Agent**: `agent-auth` | glob `app/Actions/Fortify/*`, `app/Models/User.php`, `routes/*` | dep: none.
- **Verifikasi**:
  - `php artisan test --compact --filter=Register`
  - `php artisan tinker --execute 'Schema::hasColumns("users", ["two_factor_secret","two_factor_recovery_codes","two_factor_confirmed_at"]);'` → true
  - `grep -R "administrator" app/Actions/Fortify/CreateNewUser.php` → hanya di-exclude
- **Status**: [x]

---

### M2 — RBAC (Spatie + Enum + Middleware)
- **Tujuan**: akses role-based konsisten server+client tanpa lubang.
- **URL**: gate `role:administrator` (`/admin-dashboard`), `role:explorer|administrator` (`/explorer-dashboard`), `role:member|administrator` (`/dashboard`, `/workspace`, `/assistant`).
- **Backend**: `app/Enums/{UserRole,TeamRole,UserPermission,TeamPermission}.php`; `app/Http/Middleware/EnsureUserRole.php`, `EnsureTeamMembership.php`; `app/Policies/TeamPolicy.php`.
- **Frontend**: `resources/js/lib/permissions.ts` (`ROLE`, `ROUTE_ROLES`, `usePermissions`, `canAccess`).
- **UI (anti-slop)**: nav hanya menampilkan link `canAccess()`=true. Tidak ada dead-end 403.
- **Agent**: `agent-rbac` | glob `app/Enums/*`, `app/Http/Middleware/EnsureUserRole.php`, `app/Policies/*` | dep: M1.
- **Verifikasi (bukti gap ditutup)**:
  - `php artisan tinker --execute 'App\Enums\UserRole::assignable()->doesntContain(App\Enums\UserRole::Administrator);'` → true
  - Test feature: akses `/admin-dashboard` dgn user `explorer` → 403
- **Status**: [~] (gap D: route masih gate nama role, belum `$user->can(UserPermission::...)`)

---

### M3 — Teams / Multi-Tenant
- **Tujuan**: 1 user di beberapa koperasi; route per `current_team`.
- **URL**: `{current_team}/dashboard` (name `dashboard`, `EnsureTeamMembership`), `invitations/{invitation}/accept`, `invitations/{invitation}` (decline).
- **Backend**: `app/Models/{Team,Membership,TeamInvitation}.php` (route key `slug`, `SoftDeletes`, `members()` pivot `role`), `app/Actions/Teams/CreateTeam.php`, `app/Concerns/{HasTeams,GeneratesUniqueTeamSlugs}.php`, `app/Data/{TeamPermissions,UserTeam}.php`.
- **Frontend**: `resources/js/components/team-switcher.tsx`, `app-sidebar.tsx`, `nav-user.tsx`.
- **UI (anti-slop)**: switcher jelas, slug di URL (bukan id numerik).
- **Agent**: `agent-teams` | glob `app/Models/Team*.php`, `app/Actions/Teams/*`, `app/Concerns/*`, `app/Data/*` | dep: M1.
- **Verifikasi**: `php artisan test --compact --filter=TeamPolicy`; `grep "slug" app/Models/Team.php` → `getRouteKeyName()`=slug.
- **Status**: [x]

---

### M4 — WhatsApp Engagement
- **Tujuan**: kanal engagement (pemberitahuan RAT, reward).
- **Backend**: paket `kstmostofa/laravel-whatsapp` (v1.0.2); migrasi `wa_{sessions,messages,contacts}`. Facade `WhatsApp`. Dual backend Meta Cloud API + whatsapp-web.js; webhook HMAC; jobs.
- **Frontend**: admin UI via Flux (dari paket).
- **UI (anti-slop)**: template Bahasa Indonesia, opt-in member, tidak spam.
- **Agent**: `agent-wa` | glob `vendor/kstmostofa/laravel-whatsapp/**`, `database/migrations/*wa*` | dep: none.
- **Verifikasi**: `php artisan tinker --execute 'Schema::hasTable("wa_messages") && Schema::hasColumn("wa_messages","ack");'` → true; `composer show kstmostofa/laravel-whatsapp` → versi terpasang.
- **Status**: [x] paket + migrasi; [ ] integrasi flow anggota (TODO)

---

### M5 — Onboarding (3 Peran)
- **Tujuan**: pilih peran (Explorer/Member/Administrator) → arahkan ke dashboard tepat.
- **URL**: `/` (welcome) → `/explorer-dashboard` | `/workspace` | `/admin-dashboard`.
- **Backend**: routing via `routes/web.php` + `role:`.
- **Frontend**: `resources/js/pages/onboarding.tsx` (3 kartu peran).
- **UI (anti-slop)**: copy konkret ("Jelajahi Koperasi", "Akses AI Assistant, poin & reward, Digital RAT"), BUKAN "AI-powered cooperation" generik. Hapus `PrototypeHud`.
- **Agent**: `agent-onboard` | glob `resources/js/pages/onboarding.tsx` | dep: M2.
- **Verifikasi**: `grep -i "continue\|explore organic\|perfect for people" resources/js/pages/onboarding.tsx` → TIDAK ADA; `grep "PrototypeHud" resources/js/pages/onboarding.tsx` → TIDAK ADA.
- **Status**: [~] (still EN text + PrototypeHud aktif)

---

### M6 — Explorer Dashboard (Direktori Koperasi)
- **Tujuan**: warga temukan koperasi & produk desa, AI search.
- **URL**: `/explorer-dashboard` (name `explorer.dashboard`, `role:explorer|administrator`) → `DashboardController@explorer`.
- **Backend (M13)**: `DashboardController@explorer` kembalikan `Inertia::render('explorer-dashboard', ['cooperatives' => ..., 'products' => ...])`.
  - `cooperatives` = `HackathonData::cooperatives()` (paginator): items `{koperasi_ref, nama_koperasi, status_registrasi, bentuk_koperasi, kategori_usaha, koordinat_dibulatkan, koperasiWilayah?{kode_wilayah, wilayah?{provinsi,kab_kota,kecamatan,desa_kelurahan}}}`.
  - `products` = `HackathonData::products()` (paginator): items `{produk_sample_id, koperasi_ref, kode_barcode, nama_produk, unit, koperasi?{nama_koperasi}, inventaris_sum_stok}`.
  - TIDAK ada kolom `rating` di dump → jangan hardcode bintang; pakai proxy (jumlah anggota/transaksi).
- **Frontend**: `resources/js/pages/explorer-dashboard.tsx`.
  - Prop TS:
    ```ts
    type CooperativeItem = { koperasi_ref: string; nama_koperasi: string|null; status_registrasi: string|null; bentuk_koperasi: string|null; kategori_usaha: string|null; koordinat_dibulatkan: string|null; wilayah?: { provinsi?: string; kab_kota?: string; kecamatan?: string; desa_kelurahan?: string } };
    type ProductItem = { produk_sample_id: string; koperasi_ref: string; kode_barcode: string|null; nama_produk: string|null; unit: string|null; koperasi?: { nama_koperasi: string|null }; inventaris_sum_stok: number|null };
    ```
  - UI (anti-slop): grid kartu koperasi asli (nama dari `profil_koperasi.nama_koperasi`); kartu produk asli; empty state bila `cooperatives.data` kosong; search filter nama/wilayah; loading skeleton saat fetch. BUKAN "Koperasi Hijau Lestari" hardcode.
- **Data**: `ProfilKoperasi` (2052 row), `ProdukKoperasi` (27948), `InventarisProduk` (27948), `ReferensiWilayah`.
- **Agent**: `agent-explorer` | glob `resources/js/pages/explorer-dashboard.tsx`, `app/Http/Controllers/DashboardController.php` | dep: M13.
- **Verifikasi (bukti tidak hardcode + data nyata)**:
  - `grep -n "Koperasi Hijau Lestari\|Modern Weaver" resources/js/pages/explorer-dashboard.tsx` → TIDAK ADA
  - `php artisan test --compact --filter=Explorer` assertion `cooperatives` prop = collection dari DB (count > 0)
  - `php artisan tinker --execute 'App\Models\Hackathon\ProfilKoperasi::count();'` → 2052
- **Status**: [~] UI ada, data MASIH HARDCODE (belum serap M13)

---

### M7 — Member Hub (Dashboard / Workspace / Assistant)
- **Tujuan**: anggota punya feed komunitas, voting RAT awal, AI chat, AI commerce.
- **URL**: `{current_team}/dashboard` (name `dashboard`), `/workspace` (name `member.workspace`), `/assistant` (name `member.assistant`); route group `role:member|administrator` + `EnsureTeamMembership`.
- **Backend**: `DashboardController` sekarang hanya `pendingInvitations`; tambah props `feedPosts`, `proposals`, `messages` dari data nyata (M13) — bukan mock.
- **Frontend**: `resources/js/pages/{dashboard,workspace,assistant}.tsx`.
  - UI (anti-slop): feed post asli (author `anggota_koperasi.nama`); cart di assistant hitung dari `produk_koperasi.harga_jual` (M13); subtotal/total = jumlah×harga asli. BUKAN "Sarah Jenkins" / angka acak.
- **Agent**: `agent-member` | glob `resources/js/pages/{dashboard,workspace,assistant}.tsx`, `app/Http/Controllers/DashboardController.php` | dep: M13.
- **Verifikasi**:
  - `grep -n "Sarah Jenkins\|const messages\|const feedPosts" resources/js/pages/dashboard.tsx` → TIDAK ADA array statis
  - Inertia test: akses `/assistant` → props `products`/`cart` terisi dari DB
  - `bun run build` lulus
- **Status**: [~] UI + mock ada; belum terikat data

---

### M8 — Admin Dashboard (Smart Governance + KPI)
- **Tujuan**: pengurus lihat KPI transparan & insight.
- **URL**: `/admin-dashboard` (name `admin.dashboard`, `role:administrator`) → `AdminDashboardController@__invoke`.
- **Backend (M13, SUDAH REAL)**: `AdminDashboardController` render props:
  - `kpis`: `HackathonData::kpis()` → `{total_koperasi, total_anggota, total_simpanan, total_pendapatan, total_produk, total_gerai, total_rat, latest_rat_tahun_buku}`.
    Nilai riil (Postgres, 2026-07-11): `total_koperasi=2052`, `total_anggota=148538`, `total_simpanan=909733360`, `total_pendapatan=0` (tabel `transaksi_penjualan` KOSONG di dump — bukan bug, angka jujur), `total_produk=27948`, `total_gerai=3884`, `total_rat=682`, `latest_rat_tahun_buku=2025`.
  - `ratParticipation`: `HackathonData::ratParticipation()` → `[{status_rat, tahap_rat, jumlah_rat, total_peserta, rata_peserta}]` dari `rat_koperasi`.
- **Frontend**: `resources/js/pages/admin-dashboard.tsx` (konsumsi `kpis`/`ratParticipation` prop; SUDAH tidak hardcode).
  - UI (anti-slop): angka dari query asli; grafik pakai `data:` dari query; insight AI ditandai "ringkasan otomatis" bukan fakta.
- **Agent**: `agent-admin` | glob `resources/js/pages/admin-dashboard.tsx`, `app/Http/Controllers/AdminDashboardController.php`, `app/Services/HackathonData.php` | dep: M13.
- **Verifikasi**:
  - `grep -n "4,821\|12.4k\|Rp24.8M" resources/js/pages/admin-dashboard.tsx` → TIDAK ADA
  - `php artisan test --compact --filter=AdminDashboard` assertion `kpis.total_koperasi` = 2052 (bandingkan tinker)
- **Status**: [x] KPI + ratParticipation dari query nyata (diverifikasi via tinker)

---

### M9 — e-RAT (Digital Voting Facilitation)
- **Tujuan**: partisipasi RAT mudah & transparan — FASILITASI, bukan ganti RAT sah.
- **URL**: voting di `{current_team}/dashboard` (member); ringkasan di `/admin-dashboard`.
- **Backend (M13)**: list RAT dari `rat_koperasi`; partisipasi = `jumlah_peserta_rat` / count anggota koperasi terkait. SHU TIDAK ada kolom numerik → tampilkan `laporan_hasil_usaha` (teks) + estimasi margin; JANGAN fabrikasi angka.
- **Frontend**: `resources/js/pages/dashboard.tsx` (`handleVote`, `votes`) — ganti mock jadi simpan ke tabel `rat_participation`/proposal (app-side).
  - UI (anti-slop): label "Fasilitasi RAT (bukan pengganti legal RAT)"; tampilkan `tahap_rat`; simulasi dampak SHU dari input anggota.
- **Agent**: `agent-erat` | glob `resources/js/pages/dashboard.tsx`, `database/migrations/*rat*` | dep: M13.
- **Verifikasi**: `grep -i "legal\|sah\|menggantikan RAT" resources/js/pages/dashboard.tsx` → ada disclaimer; test: voting tersimpan & terhitung (assert DB row).
- **Status**: [~] voting mock; e-RAT formal belum

---

### M10 — Gamification & Loyalty
- **Tujuan**: reward aktivitas (poin, level, badge, reward).
- **Backend (BARU, app-side)**: migrasi `member_points`, `badges`, `member_badges`; service `awardPoints()` dipanggil saat post/vote/transaksi.
- **Frontend**: `gamification-bar.tsx` di member hub; `profile?tab=rewards`.
  - UI (anti-slop): progress level nyata dari `points`; badge dari aksi nyata; reward dapat di-klaim.
- **Agent**: `agent-game` | glob `database/migrations/*points*`, `app/Models/{MemberPoint,Badge}*`, `resources/js/components/gamification*` | dep: M7.
- **Verifikasi**: `php artisan migrate --pretend | grep member_points` → migrasi ada; test: `awardPoints()` naik `points` & level; `grep "Baru" resources/js/components/gamification*` → badge state.
- **Status**: [ ] (belum ada tabel/UI)

---

### M11 — Kopdes Community
- **Tujuan**: koperasi desa terhubung (directory + knowledge board + insight lintas-Kopdes).
- **Backend (M13)**: `explorer-dashboard` = directory (`profil_koperasi` + `referensi_komoditas_desa` + `referensi_wilayah`). Knowledge board = `community_posts` (app-side). Insight = agregat publik (rata-rata dari `rat_koperasi`, best practice). HANYA agregat, tidak PII.
- **Frontend**: board di `explorer-dashboard.tsx` (tab) / `community.tsx`.
  - UI (anti-slop): directory pakai data asli; board berisi postingan nyata; insight pakai angka agregat nyata.
- **Agent**: `agent-kopdes` | glob `resources/js/pages/explorer-dashboard.tsx`, `database/migrations/*community*`, `referensi_*` | dep: M6, M13.
- **Verifikasi**: `php artisan tinker --execute 'App\Models\Hackathon\ProfilKoperasi::count();'` > 0; test: board POST tersimpan; `grep -i "PII\|nik" resources/js/pages/community.tsx` → tidak tampil raw.
- **Status**: [~] explorer statis; board belum

---

### M12 — Sidebar / Navigation (PRD-Aligned)
- **Tujuan**: navigasi pengurus sesuai PRD, AI-terintegrasi, dipermudah.
- **URL**: tidak baru; restruktur nav di admin & member.
- **Backend**: tidak ada (frontend + route grouping).
- **Frontend**: `resources/js/components/{app-sidebar,nav-main,nav-user}.tsx`; ganti nav inline `admin-dashboard.tsx`.
  - UI (anti-slop): grup — Beranda(AI Insight), Keanggotaan&Warga(Formulir-AI, Anggota+Gamifikasi, Program Magang), Usaha&Transaksi(Penjualan-AI, Off-Taker *Segera*), TataKelola(e-RAT, Laporan, SHU-AI), Komunitas(Kopdes, Artikel), Lainnya(collapsed: Simpanan/Pinjaman/Penyedia/Karyawan/Klinik/Apotek — "tidak urgent"). Badge `Baru`/`AI` di fitur partisipasi. Gate via `canAccess()`.
- **Agent**: `agent-nav` | glob `resources/js/components/{app-sidebar,nav-main,nav-user}.tsx`, `resources/js/pages/admin-dashboard.tsx` | dep: M2, M6, M8, M9, M11.
- **Verifikasi**: `grep -c "Baru\|AI" resources/js/components/app-sidebar.tsx` > 0; render test: user `explorer` tidak lihat menu `Laporan Keuangan`; `bun run build` lulus.
- **Status**: [ ] (masih inline/starter)

---

### M13 — Data Integration (Postgres Dump)
- **Tujuan**: dashboard pakai data nyata SIMKOPDES, bukan hardcode.
- **URL**: tidak baru; controller baru / `Inertia::render` props.
- **Backend (SELESAI & TERVERIFIKASI)**:
  - 27 model read-only di `app/Models/Hackathon/` (base `HackathonModel` melempar `BadMethodCallException` saat save/update/delete; `$incrementing=false`, `$timestamps=false`, `$primaryKey` sesuai, `$table` eksplisit). Tidak ada migrasi (tabel dari dump).
  - `app/Services/HackathonData.php`: `kpis()` (cache 1j), `ratParticipation()`, `cooperatives()` (paginator, cache 15m), `products()` (paginator, cache 15m). Tanpa PII.
  - `AdminDashboardController@__invoke` render `kpis` + `ratParticipation` (sudah dikonsumsi `admin-dashboard.tsx`).
  - `DashboardController@explorer` (M6) dan `@__invoke`/member (M7) BELUM menyerap props ini.
- **Frontend**: props ke M6/M7/M8/M11.
  - UI (anti-slop): semua angka/list dari query; tidak ada angka contoh.
- **Agent**: `agent-data` | glob `app/Models/Hackathon/*`, `app/Services/HackathonData.php`, `config/database.php` | dep: none (DB live sudah ada).
- **Verifikasi (sudah dijalankan, hijau)**:
  - `php artisan tinker --execute 'App\Models\Hackathon\AnggotaKoperasi::count();'` → 148538
  - `php artisan tinker --execute 'print_r(app(App\Services\HackathonData::class)->kpis());'` → total_koperasi=2052, total_anggota=148538, total_simpanan=909733360, total_pendapatan=0, total_produk=27948, total_gerai=3884, total_rat=682, latest_rat_tahun_buku=2025
  - `grep -n "4,821\|12.4k\|Rp24.8M" resources/js/pages/admin-dashboard.tsx` → TIDAK ADA
- **Status**: [x] lapisan data + admin real (diverifikasi). Explorer/dashboard member belum serap → lihat M6/M7.

---

### M14 — Localization 100% Bahasa Indonesia
- **Tujuan**: semua teks UI & pesan backend Bahasa Indonesia.
- **Backend**: flash/validation message Bahasa Indonesia (`lang/` atau inline).
- **Frontend**: semua `.tsx`.
  - UI (anti-slop): tidak "Continue"/"Login"(pakai "Masuk")/"Dashboard"(pakai "Beranda"). Hapus `PrototypeHud`.
- **Agent**: `agent-l10n` | glob `resources/js/**/*.tsx`, `resources/js/components/PrototypeHud.tsx`, `lang/**` | dep: none.
- **Verifikasi**: `grep -rniE "continue|login|register|dashboard|success|error|explore organic" resources/js --include=*.tsx` → TIDAK ADA (kecuali nama teknis); `grep -R "PrototypeHud" resources/js` → TIDAK ADA; `bun run impeccable` → 0 finding.
- **Status**: [~] (masih EN + PrototypeHud)

---

### M15 — Docs & Submission
- **Tujuan**: submission lengkap & juri-friendly.
- **Backend**: tidak ada. **Frontend**: tidak ada (dokumen).
- **Agent**: `agent-docs` | glob `README.md`, `docs/*` | dep: none.
- **Verifikasi**: `test -f README.md && test -f docs/prd.md && test -f docs/quality-gate.md && test -f docs/ai-disclosure.md` → semua ada; `docs/pitch-deck.pdf` ada (TODO); kredensial juri diisi (TODO).
- **Status**: [~] (docs ada; pitch deck + demo creds TODO)

---

### M16 — Tests & Quality (Gate)
- **Tujuan**: kode terjaga, gate blokir buruk.
- **Backend**: `tests/Feature/*`, `phpunit.xml`, `pint.json`, `phpstan.neon`.
- **Frontend**: `package.json` scripts (lint/format/types/impeccable/doctor), `doctor.config.ts`, `.githooks/pre-commit`.
- **Gate (bun, aktif)**:
  - Pre-commit: `bun run lint:check && bun run format:check && bun run types:check && bun run impeccable` + `vendor/bin/pint --test --format agent && vendor/bin/phpstan analyse`. `react-doctor` dijalankan bila `node_modules/.bin/react-doctor` ada (instal: `bun add -D react-doctor`); bila tidak ada, hook lewati dengan catatan (offline-safe).
  - Skills auto-trigger: `laravel-best-practices`, `react-best-practices`, `inertia-react-development`, `tailwindcss-development` (di `.agents/skills/`).
- **UI (anti-slop)**: tidak relevan.
- **Agent**: `agent-qa` | glob `tests/**`, `phpunit.xml`, `.githooks/pre-commit`, `pint.json`, `phpstan.neon` | dep: semua modul.
- **Verifikasi (GATE wajib hijau)**:
  - `bun run lint:check && bun run format:check && bun run types:check && bun run impeccable` → hijau
  - `vendor/bin/pint --test --format agent` → 0 style error
  - `vendor/bin/phpstan analyse --no-progress` → 0 error
  - `php artisan test --compact` → hijau
  - `git config --get core.hooksPath` → `.githooks`; `test -x .githooks/pre-commit` → true
- **Status**: [x] hook aktif + bun; [~] `react-doctor` belum terinstal (hook skip dengan catatan), test per-modul belum hijau semua.

---

## BAGIAN 5 — MILESTONE (CUKUP → SEMPURNA)

- **CUKUP** (lolos submission): M1, M2 (gap D toleran), M3, M4, M5 (min), M8, M13, M14 (min), M15 (README+PRD+ai-disclosure+deck+creds), M16 (gate hijau).
- **BAIK**: + M10 dasar, M11 board, M12 redesign, M9 e-RAT fungsional, M6 serap M13, M7 serap M13.
- **SEMPURNA**: + M10 penuh, M11 insight lintas-Kopdes, M14 100% ID (0 English), M2 gap D tutup (gate `can()`), M16 test per-modul hijau, M5/M14 0 `PrototypeHud`.

---

## BAGIAN 6 — SWARM COORDINATION NOTES

- Mission board: `.agent-board` (`agent-id | glob | branch | timestamp`).
- Resource bersama (lock): `composer.lock`, `bun.lockb`, `database/migrations`, `pint --dirty`, `.env`, Wayfinder (`@/actions`,`@/routes`).
- Integrator tunggal = orchestrator (`git merge --no-ff` per branch, tes hijau sebelum lanjut).
- Jangan `git stash`/`revert` milik agent lain; anggap diff asing = WIP agent lain.
- DB test tiap agent: `DB_DATABASE=kopera_<agent>` (bila perlu migrasi ulang; M13 pakai DB live, tidak perlu migrasi).
- Tooling wajib **bun**: `bun install`, `bun run lint:check`, `bun run format:check`, `bun run types:check`, `bun run impeccable`, `bun run doctor` (bila terpasang).
