# Modul: WhatsApp Engagement

Kanal komunikasi dua arah untuk _engagement_ warga koperasi — pengumuman RAT, notifikasi reward, dan update program koperasi langsung ke WhatsApp anggota.

## Tujuan

WhatsApp digunakan sebagai saluran _engagement_ komunitas, bukan sekadar notifikasi teknis:

- Ingatkan anggota jadwal dan hasil RAT (Rapat Anggota Tahunan).
- Kirim notifikasi reward / poin gamifikasi ("Selamat, poin Anda bertambah").
- Sebarkan info program koperasi (magang, bazar, e-commerce desa).
- Terima balasan warga (konfirmasi kehadiran, pertanyaan layanan).

## Paket yang Digunakan

Paket: `kstmostofa/laravel-whatsapp` `v1.0.2` (ada di `composer.json` dan `composer.lock`).

Deskripsi resmi di `composer.lock`:

> Dual-backend Laravel package for WhatsApp: Meta Cloud API + bundled whatsapp-web.js sidecar. Ships a Livewire/Flux admin UI, queued jobs, webhooks with HMAC, Eloquent models, broadcasting, and CLI lifecycle commands.

Kapabilitas:

| Kapabilitas | Detail |
| --- | --- |
| Dual backend | Meta Cloud API (nomor bisnis, butuh token) **dan** whatsapp-web.js sidecar (nomor pribadi via QR, gratis) |
| Admin UI | Livewire/Flux di `/whatsapp`: dashboard, session + QR, compose, chats, groups, contacts, webhook log |
| Queued jobs | Pengiriman diproses via antrean (tidak memblokir request) |
| Webhook HMAC | Verifikasi tanda tangan `WHATSAPP_APP_SECRET` (`verify_signature`) |
| Eloquent models | `wa_sessions`, `wa_messages`, `wa_contacts` |
| Broadcasting | Event Laravel untuk update status pesan secara real-time |
| CLI | Perintah siklus hidup session (install/start sidecar, listen, dll) |

Konfigurasi ada di `config/laravel-whatsapp.php`. Facade dengan alias `WhatsApp` -> `Kstmostofa\LaravelWhatsApp\Facades\WhatsApp`.

## Skema Database

Tiga migrasi di `database/migrations/` (timestamp `2026_05_21`, prefix `wa_`, koneksi dari `config('laravel-whatsapp.database.connection')`).

### `wa_sessions`

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| `id` | string (PK) | ID session |
| `backend` | string | `web` (default) atau `cloud` |
| `phone_number` | string null | Nomor terhubung |
| `push_name` | string null | Nama profil |
| `status` | string | `initializing`, `ready`, `disconnected`, dll |
| `last_qr_at` | timestamp null | Kapan QR terakhir digenerate |
| `ready_at` | timestamp null | Kapan session siap |
| `disconnected_at` | timestamp null | Kapan putus |
| `meta` | json null | Data bebas |

### `wa_messages`

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| `backend` | string | Sumber backend |
| `session_id` | string null | Relasi ke session |
| `wa_message_id` | string null | ID pesan dari WhatsApp |
| `direction` | string | `in` / `out` |
| `chat_id`, `from_id`, `to_id` | string null | Identitas obrolan |
| `type` | string | `text` (default) |
| `body` | text null | Isi pesan |
| `payload` | json null | Metadata mentah |
| `status` | string null | Status pengiriman |
| `wa_timestamp` | timestamp null | Waktu di WhatsApp |
| `ack` | smallInteger null | Level ack web.js: `-1` error, `0` pending, `1` server, `2` device, `3` read, `4` played |
| `deleted_at` | timestamp null | Marker "pesan dihapus" (bukan SoftDeletes — baris tetap tampil sebagai placeholder) |
| `deleted_for_everyone` | boolean | Diikuti `deleted_at` |

Catatan: `ack` dan `deleted_at` ditambahkan lewat migrasi terpisah `2026_05_22`. `deleted_at` **bukan** kolom SoftDeletes — Eloquent tidak menyembunyikan baris ini.

### `wa_contacts`

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| `session_id` | string | Relasi ke session |
| `wa_id` | string | ID WhatsApp kontak |
| `name`, `pushname`, `number` | string null | Identitas |
| `is_business` | boolean | Nomor bisnis |
| `is_my_contact` | boolean | Kontak tersimpan |
| `is_blocked` | boolean | Diblokir |
| `last_seen_at` | timestamp null | Terakhir terlihat |
| `meta` | json null | Data bebas |

Unique `(session_id, wa_id)`, index `number`.

## Status Saat Ini

- [x] Paket terinstal (`composer.json` + `composer.lock` `v1.0.2`).
- [x] Migrasi `wa_sessions`, `wa_messages` (dengan `ack`, `deleted_at`), `wa_contacts` ada dan terjalankan.
- [x] Konfigurasi `config/laravel-whatsapp.php` tersedia; facade `WhatsApp` terdaftar.
- [ ] Integrasi ke alur anggota **belum** dibuat (TODO): belum ada pengiriman notifikasi RAT/reward dari sisi aplikasi KOPERA-PLUS.

## Usulan Penyambungan (Wiring)

Gunakan facade `WhatsApp` untuk mengirim pesan dari alur aplikasi, misalnya saat event RAT dibuka atau poin reward bertambah:

```php
use WhatsApp; // alias Kstmostofa\LaravelWhatsApp\Facades\WhatsApp

WhatsApp::send($to, 'Halo {nama}, RAT Kopdes Anda digelar {tanggal}. Balas OK untuk konfirmasi.');
```

Praktik:

- Kirim lewat queued job agar tidak memblokir request HTTP.
- Dengarkan event `MessageReceived` / `MessageStatusUpdate` untuk memproses balasan warga (konfirmasi kehadiran, pertanyaan).
- Untuk nomor pribadi tanpa Meta API, jalankan sidecar: `php artisan whatsapp:sidecar:install` lalu `php artisan whatsapp:sidecar:start`, dan `php artisan whatsapp:web:listen` untuk stream event.
- Aktifkan HMAC: set `WHATSAPP_APP_SECRET` dan `WHATSAPP_VERIFY_SIGNATURE=true` agar webhook terverifikasi.

## Privasi

Pesan WhatsApp dapat berisi PII anggota (nama, nomor, isi pesan pribadi). Penanganan:

- Jangan log `body` pesan ke log umum / pail tanpa redaksi.
- Batasi akses UI `/whatsapp` via middleware auth + role (default hanya `web`, perlu dibungkus middleware sendiri).
- Sesuai kebijakan disclosur proyek: jelaskan ke warga bahwa nomor mereka dipakai untuk notifikasi koperasi, dan sediakan cara berhenti (opt-out).

Lihat `docs/ai-disclosure.md` untuk panduan disclosur AI/PII terkait.
