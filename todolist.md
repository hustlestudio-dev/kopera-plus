# Tasklist KOPERA-PLUS — Master Manifest (Swarm-Ready, Verification-Strict)

> Sumber kebenaran = repo ini. Live < repo (perubahan belum di-push, 1 alur dari `main`).
> Dokumen ini = BASE. Detail per-modul ada di `docs/` (`docs/modules/*`, `docs/architecture.md`, `docs/data-model.md`, `docs/ai-disclosure.md`, `docs/localization.md`, `docs/quality-gate.md`).
> Bahasa: Bahasa Indonesia. Tanpa emoji. Tanda: `[x]` `[~]` `[ ]` `[!]`.

---

## BAGIAN 0 — ATURAN VERIFIKASI (Anti-Kebohongan)

Ini yang membedakan "beres" asli vs kulitnya saja. **Tidak ada item yang boleh ditandai `[x]` oleh sub-agent yang mengerjakannya.** Hanya orchestrator/verifier yang menandai selesai, SETELAH verifikasi objectif lulus.

Sebuah item = DONE hanya jika SEMUA terpenuhi:
1. **Verification command lulus** — perintah di kolom `Verifikasi` tiap modul benar-benar dijalankan dan hijau (bukan "sudah saya cek").
2. **Pre-commit gate hijau** — `eslint`, `prettier --check`, `tsc`, `pint --test`, `phpstan`, `react-doctor`, `impeccable` tidak gagal.
3. **Bukan kulit** — bukti nyata ada: data dari Postgres (bukan hardcode), test ada & lulus, UI menampilkan data asli (bukan placeholder/lorem/angka acak).
4. **Verifier independen** — agent ke-2 (bukan pembuat) jalankan ulang verification command dan konfirmasi.

Larangan keras:
- Sub-agent TIDAK BOLEH menulis `[x]` di tasklist untuk pekerjaannya sendiri.
- Tidak boleh bilang "beres" hanya karena file ada / kompilasi lulus. Kompilasi lulus ≠ fitur jalan.
- Jika verification command tidak bisa dijalankan (env belum siap), status = `[~]` + catat blocker, BUKAN `[x]`.

Format verifikasi tiap modul wajib berisi minimal SATU perintah runnable (test / tinker query / grep / build) yang membuktikan fitur, bukan keberadaan file.

---

## BAGIAN 1 — CARA EKSEKUSI MULTI-SUBAGENT (Cepat & Tepat)

Protokol swarm: AGENTS.md (`multi-agent-swarm-coordination`). Satu orchestrator, banyak sub-agent dengan scope file disjoint.

1. **Orchestrator** (PM) pecah tasklist jadi slice independen. Tiap slice = 1 modul = 1 sub-agent.
2. **Claim**: sebelum edit, agent tulis 1 baris ke `.agent-board`:
   `agent-id | glob-file | branch | timestamp`. Dua agent tidak claim glob sama.
3. **Isolasi**: tiap agent = 1 worktree/branch (`git worktree add -b feat/x/agent-id`). Kerja hanya di file miliknya.
4. **Skill wajib auto-trigger** (sudah terpasang): `laravel-best-practices` (PHP), `vercel-react-best-practices` (React), `inertia-react-development`, `tailwindcss-development`. Agent HARUS memanggil skill sebelum tulis kode.
5. **Quality gate sebelum commit**: agent jalankan `composer test` + `npm run lint:check && npm run format:check && npm run types:check && npx react-doctor@latest --no-telemetry && vendor/bin/pint --test --format agent && vendor/bin/phpstan analyse`. Gagal = jangan commit.
6. **Commit atomik** di branch sendiri (`git commit -m "agent-id: ..."`). Jangan `git stash`/`revert` milik agent lain.
7. **Handoff**: agent kembalikan ringkas: file diubah + output verification command (paste nyata, bukan "lulus"). Bukan `[x]`.
8. **Verifier**: orchestrator spawn agent ke-2 (atau cek sendiri) jalankan ulang verification command modul itu. Hanya kalau hijau → orchestrator tandai `[x]`.
9. **Integrasi**: `git merge --no-ff` per branch oleh orchestrator, tes hijau tiap merge.

Resource bersama (serialize via lock): `composer.lock`, `package-lock.json`, `database/migrations`, `pint --dirty`, `.env`, Wayfinder generate (`@/actions`,`@/routes`).

---

## BAGIAN 2 — SUBMISSION CHECKLIST (TOR Hackathon Kemenkop)

| Item | Status | Verifikasi |
|------|--------|-----------|
| Repositori kode publik | [x] | URL repo dapat diakses juri |
| `README.md` (install + arsitektur) | [x] | `cat README.md` ada + `npm run dev` jalan |
| `docs/prd.md` (stack revisian + status) | [x] | grep "Revisi stack" ada |
| `docs/quality-gate.md` | [x] | ada |
| Pitch deck PDF (10–12 slide) | [ ] | file `docs/pitch-deck.pdf` ada, <=12 slide |
| Demo live URL + kredensial juri | [ ] | URL live kebuka; login 3 role (explorer/member/admin) lancar |
| `docs/ai-disclosure.md` (Aturan J) | [x] | ada + sebutkan alat AI yang dipakai |
| Video demo (opsional <=3 mnt) | [ ] | link unlisted YouTube/Drive |

---

## BAGIAN 3 — MODUL (M1–M16)

Status: `[x]` DONE terverifikasi | `[~]` PARTIAL | `[ ]` TODO | `[!]` BLOCKER.

---

### M1 — Auth & Fortify
- **Tujuan**: warga bisa daftar/masuk dengan aman; 2FA; pilih peran valid.
- **URL**: Fortify `/login`, `/register`, `/logout`, `/forgot-password`, `/reset-password`; `/user/profile` (update), `/user/security` (2FA, passkey). Middleware `auth`, `verified`.
- **Backend**: `app/Actions/Fortify/CreateNewUser.php` (validasi `role` via `UserRole::assignable()`, default bukan administrator), `ResetUserPassword.php`. Model `app/Models/User.php` (`HasRoles`, `HasTeams`, kolom `two_factor_*`). Migrasi `2026_07_11_*_two_factor`, `2026_07_10_*_role`, `2026_07_10_*_permission`.
- **Frontend**: `resources/js/pages/auth/*` (login, register), `resources/js/pages/settings/{profile,security,appearance}.tsx`.
- **UI (anti-slop)**: form bersih, label Bahasa Indonesia, error validasi dari backend (bukan alert generik), state loading pada tombol submit. JANGAN pakai teks "Welcome to our amazing platform".
- **Agent**: `agent-auth` | glob `app/Actions/Fortify/*`, `app/Models/User.php`, `routes/*` | dep: none.
- **Verifikasi**:
  - `php artisan test --compact --filter=Register` (atau buat test: register mengembalikan user dengan role dari `assignable()`).
  - `php artisan tinker --execute 'Schema::hasColumns("users", ["two_factor_secret","two_factor_recovery_codes","two_factor_confirmed_at"]);'` → true.
  - `grep -R "administrator" app/Actions/Fortify/CreateNewUser.php` → hanya di-exclude, tidak di-allow.
- **Status**: [x]

---

### M2 — RBAC (Spatie + Enum + Middleware)
- **Tujuan**: akses role-based konsisten server+client, tanpa lubang keamanan.
- **URL**: gate `role:administrator` (admin-dashboard), `role:explorer|administrator` (explorer-dashboard), `role:member|administrator` (dashboard/workspace/assistant).
- **Backend**: `app/Enums/{UserRole,TeamRole,UserPermission,TeamPermission}.php`; middleware `app/Http/Middleware/EnsureUserRole.php`, `EnsureTeamMembership.php`; `app/Policies/TeamPolicy.php`. `docs/role-permission.md` (gap).
- **Frontend**: `resources/js/lib/permissions.ts` (`ROLE`, `ROUTE_ROLES`, `usePermissions`, `canAccess`).
- **UI (anti-slop)**: nav hanya menampilkan link yang `canAccess()`=true (explorer tak lihat Workspace/Assistant). Tidak ada dead-end 403.
- **Agent**: `agent-rbac` | glob `app/Enums/*`, `app/Http/Middleware/EnsureUserRole.php`, `app/Policies/*`, `database/migrations/*permission*` | dep: M1.
- **Verifikasi (bukti gap ditutup)**:
  - `php artisan tinker --execute 'App\Enums\UserRole::assignable()->doesntContain(App\Enums\UserRole::Administrator);'` → true.
  - `php artisan test --compact --filter=RoleSeeder` (Permission ada & tertempel ke role).
  - Coba akses `/admin-dashboard` dgn user role `explorer` via test feature → 403, bukan 200.
- **Status**: [~] (ada gap D: route masih gate nama role, belum `$user->can(UserPermission::...)`)

---

### M3 — Teams / Multi-Tenant
- **Tujuan**: 1 user bisa di beberapa koperasi/grup; route per `current_team`.
- **URL**: `{current_team}/dashboard` (name `dashboard`, `EnsureTeamMembership`), invite `invitations/{invitation}/accept`, `invitations/{invitation}` (decline).
- **Backend**: `app/Models/{Team,Membership,TeamInvitation}.php` (route key `slug`, `SoftDeletes`, `members()` pivot `role`), `app/Actions/Teams/CreateTeam.php`, `app/Concerns/{HasTeams,GeneratesUniqueTeamSlugs}.php`, `app/Data/{TeamPermissions,UserTeam}.php`, middleware `SetTeamUrlDefaults.php`.
- **Frontend**: `resources/js/components/team-switcher.tsx`, `app-sidebar.tsx`, `nav-user.tsx`.
- **UI (anti-slop)**: switcher antar tim jelas, slug di URL, bukan id numerik.
- **Agent**: `agent-teams` | glob `app/Models/Team*.php`, `app/Actions/Teams/*`, `app/Concerns/*`, `app/Data/*`.
- **Verifikasi**: `php artisan test --compact --filter=TeamPolicy` (owner/admin/member akses benar); `grep "slug" app/Models/Team.php` → `getRouteKeyName()`=slug.
- **Status**: [x]

---

### M4 — WhatsApp Engagement
- **Tujuan**: kanal engagement (pemberitahuan RAT, reward) via WhatsApp.
- **Backend**: paket `kstmostofa/laravel-whatsapp` (v1.0.2); migrasi `2026_05_21_*_wa_{sessions,messages,contacts}`. Facade `WhatsApp`. Dual backend Meta Cloud API + whatsapp-web.js; webhook HMAC; jobs; Flux admin UI.
- **Frontend**: admin UI via Flux (dari paket); tidak ada halaman Inertia khusus yet.
- **UI (anti-slop)**: pesan template Bahasa Indonesia, tidak spam; opt-in member.
- **Agent**: `agent-wa` | glob `vendor/kstmostofa/laravel-whatsapp/**`, `database/migrations/2026_05_21_*` | dep: none.
- **Verifikasi**: `php artisan tinker --execute 'Schema::hasTable("wa_messages") && Schema::hasColumn("wa_messages","ack");'` → true; `composer show kstmostofa/laravel-whatsapp` → versi terpasang.
- **Status**: [x] paket + migrasi; [ ] integrasi flow anggota (TODO).

---

### M5 — Onboarding (3 Peran)
- **Tujuan**: pilih peran (Explorer/Member/Administrator) → arahkan ke dashboard tepat.
- **URL**: `/` (welcome) + `/onboarding` (jika ada) → `/explorer-dashboard` | `/workspace` | `/admin-dashboard`.
- **Backend**: tidak ada controller khusus; routing via `routes/web.php` + `role:`.
- **Frontend**: `resources/js/pages/onboarding.tsx` (3 kartu peran).
- **UI (anti-slop)**: copy konkret ("Jelajahi Koperasi", "Akses AI Assistant, poin & reward, Digital RAT"), BUKAN "AI-powered cooperation" generik. Hapus `PrototypeHud`.
- **Agent**: `agent-onboard` | glob `resources/js/pages/onboarding.tsx` | dep: M2.
- **Verifikasi**: `grep -i "continue\|explore organic\|perfect for people" resources/js/pages/onboarding.tsx` → TIDAK ADA (lolos lokalisasi); `grep "PrototypeHud" resources/js/pages/onboarding.tsx` → TIDAK ADA.
- **Status**: [~] (still EN text + PrototypeHud aktif)

---

### M6 — Explorer Dashboard (Direktori Koperasi)
- **Tujuan**: warga temukan koperasi & produk desa, AI search.
- **URL**: `/explorer-dashboard` (name `explorer.dashboard`, `role:explorer|administrator`).
- **Backend (M13)**: controller kembalikan props `cooperatives` (dari `profil_koperasi` JOIN `anggota_koperasi` count, `referensi_komoditas_desa`), `products` (dari `produk_koperasi`). TIDAK ada kolom `rating` di dump → jangan hardcode bintang; pakai proxy (jumlah anggota/transaksi) atau hapus.
- **Frontend**: `resources/js/pages/explorer-dashboard.tsx`.
- **UI (anti-slop)**: grid kartu koperasi asli (nama dari `profil_koperasi.nama_koperasi`, bukan "Koperasi Hijau Lestari" hardcode); kartu produk asli; empty state bila `cooperatives` kosong; search nyata (filter nama/wilayah). Loading skeleton saat fetch.
- **Agent**: `agent-explorer` | glob `resources/js/pages/explorer-dashboard.tsx` | dep: M13 (data).
- **Verifikasi**: `grep -n "Koperasi Hijau Lestari\|Modern Weaver" resources/js/pages/explorer-dashboard.tsx` → TIDAK ADA (bukti tidak hardcode); route render test: `php artisan test --compact --filter=Explorer` assertion `cooperatives` prop = collection dari DB.
- **Status**: [~] UI ada, data HARDCODE.

---

### M7 — Member Hub (Dashboard / Workspace / Assistant)
- **Tujuan**: anggota punya feed komunitas, voting RAT awal, AI chat, AI commerce.
- **URL**: `{current_team}/dashboard` (name `dashboard`), `/workspace` (name `member.workspace`), `/assistant` (name `member.assistant`).
- **Backend**: `app/Http/Controllers/DashboardController.php` (kini hanya `pendingInvitations`); harus tambah props `feedPosts`, `proposals`, `messages` dari data nyata (M13) — bukan mock.
- **Frontend**: `resources/js/pages/{dashboard,workspace,assistant}.tsx`.
- **UI (anti-slop)**: feed menampilkan post asli (author dari `anggota_koperasi.nama`); cart di assistant menghitung dari `produk_koperasi.harga_jual` (M13); subtotal/total = jumlah×harga asli. Bukan angka acak.
- **Agent**: `agent-member` | glob `resources/js/pages/{dashboard,workspace,assistant}.tsx`, `app/Http/Controllers/DashboardController.php` | dep: M13.
- **Verifikasi**: `grep -n "const messages\|const feedPosts\|const cart" resources/js/pages/*.tsx` → TIDAK ADA array statis (atau hanya sebagai fallback kosong); Inertia test: akses `/assistant` → props `products`/`cart` terisi dari DB; `npm run build` lulus.
- **Status**: [~] UI + mock ada; belum terikat data.

---

### M8 — Admin Dashboard (Smart Governance + KPI)
- **Tujuan**: pengurus lihat KPI transparan & insight.
- **URL**: `/admin-dashboard` (name `admin.dashboard`, `role:administrator`).
- **Backend (M13)**: `AdminDashboardController` kembalikan:
  - `kpis`: Anggota Aktif (`SELECT count(*) FROM anggota_koperasi WHERE status_keanggotaan='Aktif'`), Transaksi (`SELECT count(*), SUM(total_pembayaran) FROM transaksi_penjualan WHERE status_transaksi='Selesai'`), Pendapatan (`SELECT SUM(total_nilai) FROM barang_keluar_produk WHERE status_transaksi='Selesai'`), Baru Bulan Ini (`WHERE tanggal_terdaftar >= date_trunc('month', now())`).
  - `ratParticipation`: dari `rat_koperasi` (`jumlah_peserta_rat`, `tahun_buku`, `status_rat`).
- **Frontend**: `resources/js/pages/admin-dashboard.tsx` (ganti `const kpis` hardcode jadi props).
- **UI (anti-slop)**: angka dari query asli (bukan `4,821`); grafik pakai data `data:` array dari query; insight AI ditandai sebagai "ringkasan otomatis" bukan fakta.
- **Agent**: `agent-admin` | glob `resources/js/pages/admin-dashboard.tsx`, `app/Http/Controllers/AdminDashboardController.php` | dep: M13.
- **Verifikasi**: `grep -n "4,821\|12.4k\|Rp24.8M" resources/js/pages/admin-dashboard.tsx` → TIDAK ADA; route test: `php artisan test --compact --filter=AdminDashboard` assertion `kpis.0.value` = hasil query nyata (bandingkan dengan `php artisan tinker` query).
- **Status**: [~] KPI hardcode.

---

### M9 — e-RAT (Digital Voting Facilitation)
- **Tujuan**: partisipasi RAT mudah & transparan — FASILITASI, bukan ganti RAT sah.
- **URL**: voting di `{current_team}/dashboard` (member); admin lihat ringkasan di `/admin-dashboard`.
- **Backend (M13)**: list RAT dari `rat_koperasi`; hitung partisipasi = `jumlah_peserta_rat` / count anggota koperasi terkait. SHU TIDAK ada kolom numerik → tampilkan `laporan_hasil_usaha` (teks) + estimasi dari margin, JANGAN fabrikasi angka.
- **Frontend**: `resources/js/pages/dashboard.tsx` (`handleVote`, `votes`) — ganti mock jadi simpan ke tabel `rat_participation`/proposal (app-side).
- **UI (anti-slop)**: label "Fasilitasi RAT (bukan pengganti legal RAT)"; tampilkan `tahap_rat`; simulasi dampak SHU dari input anggota.
- **Agent**: `agent-erat` | glob `resources/js/pages/dashboard.tsx`, `rat_koperasi`, `database/migrations/*rat*` | dep: M13.
- **Verifikasi**: `grep -i "legal\|sah\|menggantikan RAT" resources/js/pages/dashboard.tsx` → ada disclaimer; test: voting tersimpan & terhitung (assert DB row).
- **Status**: [~] voting mock; e-RAT formal belum.

---

### M10 — Gamification & Loyalty
- **Tujuan**: reward aktivitas (poin, level, badge, reward) untuk sustain engagement.
- **Backend (BARU, app-side, TIDAK di dump)**: migrasi `member_points` (`anggota_ref`, `points`, `level`), `badges` (`kode`, `nama`, `deskripsi`), `member_badges` (pivot). Service `awardPoints()` dipanggil saat post/vote/transaksi.
- **Frontend**: komponen `gamification-bar.tsx` di member hub; halaman `profile?tab=rewards`.
- **UI (anti-slop)**: progress level nyata dari `points`; badge didapat dari aksi nyata; reward dapat di-klaim. Bukan badge kosong.
- **Agent**: `agent-game` | glob `database/migrations/*points*`, `app/Models/{MemberPoint,Badge}*`, `resources/js/components/gamification*` | dep: M7.
- **Verifikasi**: `php artisan migrate --pretend | grep member_points` → migrasi ada; test: `awardPoints()` menambah `points` & naik level; `grep "Baru" resources/js/components/gamification*` → badge state.
- **Status**: [ ] (belum ada tabel/UI)

---

### M11 — Kopdes Community
- **Tujuan**: koperasi desa terhubung (directory + knowledge board + insight lintas-Kopdes).
- **Backend (M13)**: `explorer-dashboard` = directory (`profil_koperasi` + `referensi_komoditas_desa` + `referensi_wilayah`). Knowledge board = tabel `community_posts` (app-side). Insight = agregat publik (rata-rata SHU per `kategori_usaha` dari `rat_koperasi`, best practice). HANYA agregat, tidak PII.
- **Frontend**: board di `explorer-dashboard.tsx` (tab baru) / `community.tsx`.
- **UI (anti-slop)**: directory pakai data asli; board berisi postingan nyata (bukan "Postingan contoh"); insight pakai angka agregat nyata.
- **Agent**: `agent-kopdes` | glob `resources/js/pages/explorer-dashboard.tsx`, `database/migrations/*community*`, `referensi_*` | dep: M6, M13.
- **Verifikasi**: `php artisan tinker --execute 'App\Models\Hackathon\ProfilKoperasi::count();'` > 0; test: board POST tersimpan; `grep -i "PII\|nik" resources/js/pages/community.tsx` → tidak tampil raw.
- **Status**: [~] explorer statis; board belum.

---

### M12 — Sidebar / Navigation (PRD-Aligned)
- **Tujuan**: navigasi pengurus sesuai PRD, AI-terintegrasi, dipermudah.
- **URL**: tidak baru; restruktur nav di admin & member.
- **Backend**: tidak ada (frontend + route grouping).
- **Frontend**: `resources/js/components/app-sidebar.tsx` (central), `nav-main.tsx`, `nav-user.tsx`; ganti nav inline `admin-dashboard.tsx`.
- **UI (anti-slop)**: grup — Beranda(AI Insight), Keanggotaan&Warga(Formulir-AI, Anggota+Gamifikasi, Program Magang), Usaha&Transaksi(Penjualan-AI, Off-Taker *Segera*), TataKelola(e-RAT, Laporan, SHU-AI), Komunitas(Kopdes, Artikel), Lainnya(collapsed: Simpanan/Pinjaman/Penyedia/Karyawan/Klinik/Apotek — "tidak urgent"). Badge `Baru`/`AI` di fitur partisipasi. Gate via `canAccess()`.
- **Agent**: `agent-nav` | glob `resources/js/components/{app-sidebar,nav-main,nav-user}.tsx`, `resources/js/pages/admin-dashboard.tsx` | dep: M2, M6, M8, M9, M11.
- **Verifikasi**: `grep -c "Baru\|AI" resources/js/components/app-sidebar.tsx` > 0; render test: user `explorer` tidak lihat menu `Laporan Keuangan` (role gate); `npm run build` lulus.
- **Status**: [ ] (masih inline/starter)

---

### M13 — Data Integration (Postgres Dump)
- **Tujuan**: dashboard pakai data nyata SIMKOPDES, bukan hardcode.
- **URL**: tidak baru; controller baru/`Inertia::render` props.
- **Backend**: model read-only `app/Models/Hackathon/*.php` per tabel dump (`ProfilKoperasi`, `AnggotaKoperasi`, `TransaksiPenjualan`, `RatKoperasi`, `ProdukKoperasi`, `SimpananAnggota`, `BarangKeluarProduk`, `Pengajuan*`, dll). `$incrementing=false`, `$timestamps=false`, `$primaryKey` sesuai, `protected $table` eksplisit. Tidak ada migrasi (tabel dari dump). Query KPI di `docs/data-model.md`.
- **Frontend**: props ke M6/M7/M8/M11.
- **UI (anti-slop)**: semua angka/list dari query; tidak ada angka contoh.
- **Agent**: `agent-data` | glob `app/Models/Hackathon/*`, `config/database.php` | dep: none (DB live sudah ada).
- **Verifikasi**: `php artisan tinker --execute 'App\Models\Hackathon\AnggotaKoperasi::count();'` > 0 (bukti terhubung Postgres); `php artisan tinker --execute 'App\Models\Hackathon\TransaksiPenjualan::where("status_transaksi","Selesai")->count();'` > 0; query KPI di `docs/data-model.md` jalan tanpa error.
- **Status**: [ ] (dashboards masih hardcode)

---

### M14 — Localization 100% Bahasa Indonesia
- **Tujuan**: semua teks UI & pesan backend Bahasa Indonesia.
- **Backend**: semua flash/validation message Bahasa Indonesia (via `lang/` atau inline).
- **Frontend**: semua `.tsx`.
- **UI (anti-slop)**: tidak ada "Continue", "Login" (pakai "Masuk"), "Dashboard" (pakai "Beranda"). Hapus `PrototypeHud`.
- **Agent**: `agent-l10n` | glob `resources/js/**/*.tsx`, `resources/js/components/PrototypeHud.tsx`, `lang/**` | dep: none.
- **Verifikasi**: `grep -rniE "continue|login|register|dashboard|success|error|explore organic" resources/js --include=*.tsx` → TIDAK ADA (kecuali nama teknis); `grep -R "PrototypeHud" resources/js` → TIDAK ADA; `npx impeccable detect resources/` → 0 finding.
- **Status**: [~] (masih EN + PrototypeHud)

---

### M15 — Docs & Submission
- **Tujuan**: submission lengkap & juri-friendly.
- **Backend**: tidak ada.
- **Frontend**: tidak ada (dokumen).
- **Agent**: `agent-docs` | glob `README.md`, `docs/*` | dep: none.
- **Verifikasi**: `test -f README.md && test -f docs/prd.md && test -f docs/quality-gate.md && test -f docs/ai-disclosure.md` → semua ada; `docs/pitch-deck.pdf` ada (TODO).
- **Status**: [~] (docs ada; pitch deck + demo creds TODO)

---

### M16 — Tests & Quality (Gate)
- **Tujuan**: kode terjaga, gate blokir buruk.
- **Backend**: `tests/Feature/*`, `phpunit.xml`, `pint.json`, `phpstan.neon`, `eslint.config.js`.
- **Frontend**: `package.json` scripts, `doctor.config.ts`, `.githooks/pre-commit`.
- **UI (anti-slop)**: tidak relevan.
- **Agent**: `agent-qa` | glob `tests/**`, `phpunit.xml`, `.githooks/pre-commit`, `pint.json`, `phpstan.neon` | dep: semua modul.
- **Verifikasi (GATE wajib hijau sebelum merge)**:
  - `vendor/bin/pint --test --format agent` → 0 style error
  - `vendor/bin/phpstan analyse --no-progress` → 0 error
  - `npm run lint:check && npm run format:check && npm run types:check` → hijau
  - `npx react-doctor@latest --no-telemetry` → 0 finding
  - `php artisan test --compact` → hijau
  - `.githooks/pre-commit` executable + `git config core.hooksPath` = `.githooks`
- **Status**: [~] (tool ada; pre-commit perlu chmod + npm install react-doctor)

---

## BAGIAN 4 — QUALITY GATE (Singkat)

Semua pekerjaan lewat: skill auto-trigger (`laravel-best-practices`, `vercel-react-best-practices`, `inertia-react-development`, `tailwindcss-development`) + pre-commit `.githooks/pre-commit` (eslint+prettier+tsc+react-doctor+pint+phpstan+impeccable). Detail: `docs/quality-gate.md`. Pre-commit blokir commit jika gagal — jadi "bad code" tidak bisa masuk `main` tanpa `--no-verify`.

---

## BAGIAN 5 — MILESTONE (CUKUP → SEMPURNA)

- **CUKUP** (lolos submission): M1,M2(gap D toleran),M3,M4,M5(min),M6(data nyata),M7(data nyata),M8(data nyata),M9(min),M13,M14(min),M15(README+PRD+ai-disclosure+deck+creds),M16(gate hijau).
- **BAIK**: + M10 dasar, M11 board, M12 redesign, M9 e-RAT fungsional.
- **SEMPURNA**: + M10 penuh, M11 insight lintas-Kopdes, M14 100% ID (0 English), M2 gap D tutup (gate `can()`), M16 test per-modul hijau.

---

## BAGIAN 6 — SWARM COORDINATION NOTES

- Mission board: `.agent-board` (`agent-id | glob | branch | timestamp`).
- Resource bersama (lock): `composer.lock`, `package-lock.json`, `database/migrations`, `pint --dirty`, `.env`, Wayfinder (`@/actions`,`@/routes`).
- Integrator tunggal = orchestrator (`git merge --no-ff` per branch, tes hijau sebelum lanjut).
- Jangan `git stash`/`revert` milik agent lain; anggap diff asing = WIP agent lain.
- DB test tiap agent: `DB_DATABASE=kopera_<agent>` (bila perlu migrasi ulang).
