<?php

namespace App\Services;

use App\Models\Hackathon\AnggotaKoperasi;
use App\Models\Hackathon\GeraiKoperasi;
use App\Models\Hackathon\ProdukKoperasi;
use App\Models\Hackathon\ProfilKoperasi;
use App\Models\Hackathon\RatKoperasi;
use App\Models\Hackathon\SimpananAnggota;
use App\Models\Hackathon\TransaksiPenjualan;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;

/**
 * Read-only KPI/aggregate source for the hackathon committee dump.
 *
 * Only aggregates (count/sum) and non-sensitive columns are selected. Privately
 * identifiable fields (national id number, phone number, contact mailbox, member
 * name, residence address, ...) are never queried. When the dump is not loaded the
 * methods degrade to safe empty/zero defaults so the dashboards still render.
 */
final class HackathonData
{
    private static function available(): bool
    {
        return Cache::remember('hackathon:available', now()->addMinute(), static fn (): bool => Schema::hasTable('profil_koperasi'));
    }

    public static function kpis(): array
    {
        if (! self::available()) {
            return [
                'total_koperasi' => 0,
                'total_anggota' => 0,
                'total_simpanan' => 0.0,
                'total_pendapatan' => 0.0,
                'total_produk' => 0,
                'total_gerai' => 0,
                'total_rat' => 0,
                'latest_rat_tahun_buku' => 0,
            ];
        }

        // ponytail: hour cache chosen for a read-only dump; tighten to Cache::flexible()
        // when near-real-time refresh is required.
        return Cache::remember('hackathon:kpis', now()->addHour(), static function (): array {
            return [
                'total_koperasi' => (int) ProfilKoperasi::count(),
                'total_anggota' => (int) AnggotaKoperasi::count(),
                'total_simpanan' => (float) SimpananAnggota::sum('jumlah_simpanan'),
                'total_pendapatan' => (float) TransaksiPenjualan::where('status_transaksi', 'Selesai')->sum('total_pembayaran'),
                'total_produk' => (int) ProdukKoperasi::count(),
                'total_gerai' => (int) GeraiKoperasi::count(),
                'total_rat' => (int) RatKoperasi::count(),
                'latest_rat_tahun_buku' => (int) RatKoperasi::max('tahun_buku'),
            ];
        });
    }

    public static function ratParticipation(): Collection
    {
        if (! self::available()) {
            return new Collection;
        }

        return Cache::remember('hackathon:rat_participation', now()->addHour(), static function (): Collection {
            return RatKoperasi::query()
                ->select(['status_rat', 'tahap_rat'])
                ->selectRaw('COUNT(*) AS jumlah_rat')
                ->selectRaw('SUM(jumlah_peserta_rat) AS total_peserta')
                ->selectRaw('AVG(jumlah_peserta_rat) AS rata_peserta')
                ->groupBy(['status_rat', 'tahap_rat'])
                ->orderByDesc('jumlah_rat')
                ->get();
        });
    }

    public static function cooperatives(): LengthAwarePaginator
    {
        if (! self::available()) {
            return new Paginator([], 0, 50);
        }

        return Cache::remember('hackathon:cooperatives', now()->addMinutes(15), static function (): LengthAwarePaginator {
            return ProfilKoperasi::query()
                ->select([
                    'koperasi_ref',
                    'nama_koperasi',
                    'status_registrasi',
                    'bentuk_koperasi',
                    'kategori_usaha',
                    'koordinat_dibulatkan',
                ])
                ->with(['koperasiWilayah' => static function ($query): void {
                    $query->select(['koperasi_ref', 'kode_wilayah'])
                        ->with(['wilayah' => static function ($query): void {
                            $query->select([
                                'kode_wilayah',
                                'provinsi',
                                'kab_kota',
                                'kecamatan',
                                'desa_kelurahan',
                            ]);
                        }]);
                }])
                ->orderBy('nama_koperasi')
                ->paginate(50);
        });
    }

    public static function products(): LengthAwarePaginator
    {
        if (! self::available()) {
            return new Paginator([], 0, 50);
        }

        return Cache::remember('hackathon:products', now()->addMinutes(15), static function (): LengthAwarePaginator {
            return ProdukKoperasi::query()
                ->select([
                    'produk_sample_id',
                    'koperasi_ref',
                    'kode_barcode',
                    'nama_produk',
                    'unit',
                ])
                ->with(['koperasi' => static function ($query): void {
                    $query->select(['koperasi_ref', 'nama_koperasi']);
                }])
                ->withSum('inventaris', 'stok')
                ->orderBy('nama_produk')
                ->paginate(50);
        });
    }
}
