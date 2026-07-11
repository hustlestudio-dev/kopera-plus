# Modul: Sidebar / Navigation

Navigasi sisi KOPERA-PLUS: shell peran (anggota/penjelajah/administrator) dan rancangan sidebar pengurus yang selaras dengan PRD.

## Kondisi Saat Ini

- [~] `resources/js/components/app-sidebar.tsx` — shell nav berbasis peran (TeamSwitcher + NavMain + NavUser). Sudah memanggil `canAccess()` dari `resources/js/lib/permissions.ts` untuk menyembunyikan link yang akan 403.
- [~] `resources/js/pages/admin-dashboard.tsx` — punya nav **inline** (blok `href`/`label`/`icon`) yang **belum** selaras PRD. Isinya: Dashboard (aktif), Workspace, Asisten AI, lalu item tidak-aktif bertanda "Segera Hadir" (Inventaris, Transaksi, Hadiah, Komunitas, Digital RAT, Laporan, AI Insight, Pusat Bantuan), Pengaturan, Keluar.
- [x] `onboarding.tsx` — pemilih 3 peran (Explorer / Member / Administrator) lewat `ROLE` di `permissions.ts`.
- [ ] Sidebar pengurus belum disentralisasi ke `app-sidebar.tsx` dan belum mencerminkan struktur grup PRD.

Komponen terkait: `nav-main.tsx` (render grup/item), `nav-user.tsx` (footer profil), `team-switcher.tsx` (pilih wilayah koperasi / `currentTeam`).

## Peran & Gating Klien

`resources/js/lib/permissions.ts` adalah sumber kebenaran gating di klien:

- `ROLE` = `explorer` / `member` / `administrator` (cermin `App\Enums\UserRole`).
- `ROUTE_ROLES` memetakan path -> peran yang boleh (cermin middleware `role:` di `routes/web.php`).
- `canAccess(href, required?)` dipakai NavMain/AppSidebar agar link gated tak pernah tampil ke peran yang akan 403.

## Rancangan Sidebar Pengurus (PRD-Aligned)

Struktur grup untuk peran administrator / pengurus. `*` = bertanda `Segera` (belum MVP). Back-office tidak-urgent dimasukkan ke grup "Lainnya" yang bisa dilipat.

| Group | Menu Item | Fitur PRD | AI Hook | MVP? |
| --- | --- | --- | --- | --- |
| Beranda | AI Insight | Dashboard kopilot bisnis | Ringkasan KPI + rekomendasi AI | Ya |
| Keanggotaan & Warga | Formulir-AI Onboarding | Pendaftaran anggota terbantu AI | Isi otomatis formulir dari input warga | Ya |
| Keanggotaan & Warga | Anggota + Gamifikasi | Manajemen anggota + poin/reward | Rekomendasi engangement | Ya |
| Keanggotaan & Warga | Program Magang | Penyaluran magang koperasi | Pencocokan anggota <-> lowongan | Ya |
| Usaha & Transaksi | Penjualan-AI Commerce | E-commerce desa | Rekomendasi produk / checkout AI | Ya |
| Usaha & Transaksi | Off-Taker *Segera* | Pembeli akhir/off-taker | Prediksi permintaan | Tidak* |
| Tata Kelola & Transparansi | e-RAT | Rapat Anggota Tahunan digital | Voting & ringkasan otomatis | Ya |
| Tata Kelola & Transparansi | Laporan Keuangan | Laporan keuangan koperasi | Ringkasan naratif AI | Ya |
| Tata Kelola & Transparansi | SHU-AI Explainer | Pembagian SHU yang bisa dijelaskan | Penjelas SHU per anggota | Ya |
| Komunitas | Kopdes Community | Papan komunitas antar kopdes | Moderasi / rekomendasi konten | Ya |
| Komunitas | Artikel / Knowledge | Basis pengetahuan koperasi | Penulis artikel terbantu AI | Ya |
| Lainnya (collapsed) | Simpanan | Simpan pokok/wajib/sukarela | — | Tidak (back-office) |
| Lainnya (collapsed) | Pinjaman | Pinjaman anggota | — | Tidak (back-office) |
| Lainnya (collapsed) | Penyedia | Supplier / vendor | — | Tidak (back-office) |
| Lainnya (collapsed) | Karyawan | SDM koperasi | — | Tidak (back-office) |
| Lainnya (collapsed) | Klinik Desa | Layanan kesehatan desa | — | Tidak (back-office) |
| Lainnya (collapsed) | Apotek Desa | Layanan apotek desa | — | Tidak (back-office) |

## Pemetaan dari Sidebar Operator SIMKOPDES

SIMKOPDES (sistem operasional koperasi konvensional) dipetakan ke ekuivalen KOPERA-PLUS dengan penyederhanaan + AI.

| SIMKOPDES (operator) | KOPERA-PLUS | Penyederhanaan / AI |
| --- | --- | --- |
| Beranda | Beranda -> AI Insight | Dashboard naratif AI, bukan tabel mentah |
| Formulir Permohonan | Formulir-AI Onboarding | Isi otomatis + validasi AI |
| Anggota | Anggota + Gamifikasi | Tambah poin/reward |
| Karyawan | Lainnya -> Karyawan | Back-office, dilipat |
| RAT | e-RAT | Voting digital + ringkasan AI |
| Simpanan | Lainnya -> Simpanan | Back-office, dilipat |
| Pinjaman | Lainnya -> Pinjaman | Back-office, dilipat |
| Penjualan | Penjualan-AI Commerce | Rekomendasi produk AI |
| Off-Taker | Off-Taker *Segera* | Ditunda (belum MVP) |
| Klinik Desa | Lainnya -> Klinik Desa | Back-office, dilipat |
| Apotek Desa | Lainnya -> Apotek Desa | Back-office, dilipat |
| Laporan Keuangan | Laporan Keuangan | Ringkasan naratif AI |
| SHU | SHU-AI Explainer | Penjelas per anggota |
| Program Magang | Program Magang | Pencocokan AI |
| Artikel Koperasi | Artikel / Knowledge | Penulis AI |
| Penyedia | Lainnya -> Penyedia | Back-office, dilipat |

## Keputusan Desain

- Modul back-office (Simpanan, Pinjaman, Karyawan, Klinik Desa, Apotek Desa, Penyedia) -> grup "Lainnya" yang **collapsed** (tidak urgent). Boleh di-drop jika waktu habis.
- Off-Taker ditandai `Segera` (bukan MVP).

## Catatan Implementasi

- Sentralisasi nav ke `resources/js/components/app-sidebar.tsx`; hapus nav inline di `admin-dashboard.tsx`.
- Setiap item nav memakai `{ title, href, icon, roles? }` (lihat tipe `NavItem`/`NavGroup` di `resources/js/types`).
- Gate via `canAccess(item.href, item.roles)` (sudah ada di AppSidebar) — jangan render link yang akan 403.
- Tambah badge `Baru` / `AI` pada item fitur baru atau bermuatan AI (mis. AI Insight, Formulir-AI Onboarding, SHU-AI Explainer, Penjualan-AI Commerce).
- Jaga `ROUTE_ROLES` di `permissions.ts` tetap sinkron dengan middleware `role:` di backend agar gating klien dan server tidak drift.

## Tautan

Milestone: lihat `todolist.md` -> **M12 — Sidebar / Navigation (PRD-Aligned)** (Owner: agent-nav; Glob: `app-sidebar.tsx`, `nav-main.tsx`, `admin-dashboard.tsx` nav inline). M12 masuk kategori "BAIK" (redesign).
