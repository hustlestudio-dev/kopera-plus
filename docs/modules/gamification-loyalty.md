# Modul: Gamification & Loyalty System

KOPERA-PLUS — Platform Keterlibatan Koperasi Bertenaga AI (Theme 3 Hackathon).

## Objective

Berdasarkan PRD (v1.2) bagian 2:

> Meningkatkan engagement anggota.

Memberi penghargaan atas aktivitas (transaksi, partisipasi, kontribusi) agar keterlibatan anggota berkelanjutan.

## PRD Spec

| Elemen | Spesifikasi PRD |
|---|---|
| Point System | Poin diberikan untuk: Transaksi, Mengikuti RAT, Pelatihan, Mengajak anggota baru, Event, Melengkapi profil. |
| Level | Bronze -> Silver -> Gold -> Platinum -> Village Hero |
| Badge | First Transaction, Active Member, Community Hero, Top Contributor, Early Supporter |
| Rewards | Voucher, Diskon, Produk UMKM, Sembako, Bibit, Pupuk |

## Implementasi Saat Ini di Repo

| Cakupan | Status | Catatan |
|---|---|---|
| Tabel `member_points` / `badges` / `levels` | [ ] missing | Belum ada migrasi/Model Eloquent. |
| UI level/badge/poin di member hub | [ ] missing | `dashboard.tsx` punya poin & rewards disebut di onboarding copy, tapi tidak ada state/UI points. |
| Logika award points | [ ] missing | Belum ada. |
| Redemption rewards | [ ] missing | Belum ada. |

Tanda: [x] real · [~] mock · [ ] missing.

Catatan penting: modul ini SELURUHNYA direncanakan (planned). Semua data loyalty adalah app-side (milik aplikasi KOPERA-PLUS), BUKAN bagian dari dump komite koperasi yang disediakan panitia. Jangan campur dengan data master anggota/koperasi dari komite.

## Proposed Data Model

| Tabel | Kolom Usulan | Keterangan |
|---|---|---|
| `member_points` | `id`, `member_id` (FK anggota), `activity_type` (transaksi/rat/pelatihan/refer/event/profil), `points`, `reference_id`, `created_at` | 1 baris per event penghargaan poin. |
| `badges` | `id`, `code` (first_transaction/active_member/...), `name`, `description`, `icon`, `threshold` | Daftar master badge (sesuai 5 badge PRD). |
| `member_badges` | `id`, `member_id`, `badge_id`, `awarded_at` | Penghubung anggota <-> badge. |
| `levels` | `id`, `code` (bronze/silver/gold/platinum/village_hero), `name`, `min_points` | Threshold naik level (urut Bronze->Village Hero). |
| `rewards` | `id`, `name`, `type` (voucher/diskon/produk_umkm/sembako/bibit/pupuk), `cost_points`, `stock` | Katalog reward yang bisa ditukar. |
| `reward_redemptions` | `id`, `member_id`, `reward_id`, `points_spent`, `status`, `created_at` | Log penukaran poin. |

## Proposed Wiring

1. Award points — event hook Laravel:
   - Post/comment/like di community feed (`dashboard.tsx`) -> `member_points` (activity `event`/`community`).
   - Vote RAT (`handleVote`) -> `member_points` (activity `rat`).
   - Transaksi commerce (`assistant.tsx` checkout) -> `member_points` (activity `transaksi`).
   - Profil lengkap / refer anggota baru -> `member_points` (`profil`/`refer`).
2. Tampilkan level & badge di member hub — baca total poin anggota, tentukan `level` dari `min_points`, tampilkan badge terkunci/terbuka. Pasang di `dashboard.tsx` (sidebar/profil).
3. Redemption — halaman/modal tukar poin ke `rewards`; kurangi `member_points` (atau catat di `reward_redemptions`), kurangi `stock`.
4. Trigger Engagement Analytics — bila poin/aktivitas menurun, kirim reminder (selaras AI touchpoint "Engagement harian" di modul AI Member Assistant).

## Milestone

- Rencana masuk `docs/todolist.md` M10 (catatan: file `todolist.md` belum ada di repo saat dokumen ini ditulis — perlu dibuat/diupdate saat milestone dibuka).
- Modul ini beririsan dengan "Engagement harian" pada peta AI End-to-End: poin & reward jadi output terukur yang dipicu AI.

Lihat juga: `docs/modules/ai-member-assistant.md` untuk sumber aktivitas yang memicu award poin.
