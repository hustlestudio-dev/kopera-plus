# Modul Teams & Multi-Tenant — KOPERA-PLUS

Modul multi-tenant: setiap pengguna beroperasi di dalam satu atau lebih
**Wilayah Koperasi** (satuan kerja koperasi). Backend memakai model `Team`
dari Jetstream, tetapi tiap teks yang terlihat user menyebut **"Wilayah
Koperasi"** (lihat rebrand di `docs/role-permission.md` section 6).

Otorisasi tingkat platform (Spatie + `UserRole`) didokumentasikan terpisah di
`docs/modules/auth-rbac.md`.

## 1. Konsep

- **Team = Wilayah Koperasi**: unit workspace/tenant. User bisa memiliki,
  menjadi anggota, atau diundang ke banyak team.
- **Route key = `slug`** (bukan `id`): `Team::getRouteKeyName()` mengembalikan
  `'slug'`. URL seperti `/{current_team}/dashboard` memakai slug.
- **Soft-delete aktif**: `Team` menggunakan `SoftDeletes`; slug unik dijaga
  lewat `withTrashed()` agar team terhapus tak mengklaim slug lama.
- Backend menyimpan `Team`, UI menampilkan "Wilayah Koperasi" — identifier
  kode (`Team`, `team`, `/settings/teams`) sengaja tidak diubah.

## 2. Models & Relasi

| Kelas | File | Catatan |
|-------|------|---------|
| `Team` | `app/Models/Team.php` | `slug` route key, `SoftDeletes`, `GeneratesUniqueTeamSlugs`. `fillable: name, slug, is_personal`. |
| `Membership` | `app/Models/Membership.php` | Pivot `team_members` (auto-increment id). `role` cast ke `TeamRole`. Relasi `team()` / `user()`. |
| `TeamInvitation` | `app/Models/TeamInvitation.php` | Route key `code` (random 64). `role` cast ke `TeamRole`; `isAccepted/isPending/isExpired`. |
| `User` | `app/Models/User.php` | `use HasTeams` (konflik `teams` diselesaikan: `HasTeams::teams insteadof HasRoles`). |

### Relasi utama (`Team`)

- `members()` — `BelongsToMany(User)` via `team_members`, `using(Membership)`,
  `withPivot(['role'])`, `withTimestamps()`.
- `memberships()` — `HasMany(Membership)`.
- `invitations()` — `HasMany(TeamInvitation)`.
- `owner()` — anggota dengan pivot `role = owner`.

### Lifecycle slug

- Saat create: bila `slug` kosong -> `generateUniqueTeamSlug(name)`.
- Saat update bila `name` berubah -> regenerate slug (unik, dengan suffix
  `-N` lewat `withTrashed()`).

## 3. Concerns & Action

- `app/Concerns/HasTeams.php` — relasi user ke team:
  `teams()`, `ownedTeams()`, `teamMemberships()`, `currentTeam()`,
  `personalTeam()`, `switchTeam(Team)`, `belongsToTeam(Team)`,
  `isCurrentTeam(Team)`, `ownsTeam(Team)`, `teamRole(Team): ?TeamRole`,
  `hasTeamPermission(Team, TeamPermission): bool`, `toUserTeam()`,
  `toUserTeams()`, `toTeamPermissions()`, `fallbackTeam()`.
- `app/Concerns/GeneratesUniqueTeamSlugs.php` — `generateUniqueTeamSlug()`
  (suffix unik, menghormati soft-delete).
- `app/Actions/Teams/CreateTeam.php` — `handle(User, name, isPersonal=false)`:
  dalam `DB::transaction` buat `Team`, buat `Membership` role `Owner`, lalu
  `switchTeam()`. Dipakai `CreateNewUser` untuk wilayah pribadi user.

## 4. Policy & Middleware

- `app/Policies/TeamPolicy.php` — otorisasi berbasis `TeamPermission` via
  `hasTeamPermission()`:
  - `view` -> `belongsToTeam`; `update` -> `UpdateTeam`; `delete` ->
    `!is_personal && DeleteTeam`.
  - `addMember` / `updateMember` / `removeMember` -> kapabilitas anggota.
  - `inviteMember` / `cancelInvitation` -> kapabilitas undangan.
  - `leave` -> boleh bila bukan personal, anggota, dan bukan owner.
- `app/Http/Middleware/EnsureTeamMembership.php` — argumen `?minimumRole`:
  - `abort(403)` bila tak login / team tak ada / bukan anggota.
  - bila `minimumRole` diberikan, cek `teamRole()->isAtLeast(TeamRole::tryFrom($minimumRole))`.
  - bila route `current_team` ada dan bukan current -> `switchTeam()`.
- `app/Http/Middleware/SetTeamUrlDefaults.php` — isi `URL::defaults()`
  `current_team`/`team` = slug `currentTeam` user, agar link terbentuk tanpa
  menyebut slug manual.

### Routing (terkait team)

`routes/web.php`:

```
{current_team}/dashboard        -> DashboardController  (EnsureTeamMembership)
```

`routes/settings.php` (grup `EnsureTeamMembership`):

```
settings/teams                       (index, store)
settings/teams/{team}               (edit, update, destroy, switch, leave)
settings/teams/{team}/members/{user}          (update, destroy)
settings/teams/{team}/invitations           (store)
settings/teams/{team}/invitations/{invitation} (destroy)
```

## 5. Data Classes

- `app/Data/TeamPermissions.php` — readonly: `canUpdateTeam`, `canDeleteTeam`,
  `canAddMember`, `canUpdateMember`, `canRemoveMember`, `canCreateInvitation`,
  `canCancelInvitation`. Dihasilkan `User::toTeamPermissions(Team)`.
- `app/Data/UserTeam.php` — readonly: `id`, `name`, `slug`, `isPersonal`,
  `role` (value), `roleLabel`, `isCurrent?`. Dihasilkan `User::toUserTeam(Team)`.

## 6. Status Implementasi

| Komponen | Status |
|----------|:------:|
| Model `Team` (slug, soft-delete, slug unik) | [x] |
| `Membership` pivot + `TeamRole` | [x] |
| `TeamInvitation` (code, accept/expire) | [x] |
| `HasTeams` concern | [x] |
| `CreateTeam` action | [x] |
| `TeamPolicy` (capability-driven) | [x] |
| `EnsureTeamMembership` + `SetTeamUrlDefaults` | [x] |
| `TeamPermissions` / `UserTeam` DTO | [x] |
| Rekonsiliasi peran platform vs wilayah | [ ] (lihat `docs/role-permission.md` section 1) |

Catatan mapping terminologi: kode memakai `Team`/`team`, UI menampilkan
"Wilayah Koperasi" / "Koperasi/Grup". Perlu validasi UI bahwa seluruh teks
terlihat sudah konsisten (sidebar, `TeamSwitcher`, `CreateTeamModal`) —
identifier kode sengaja tidak diubah.

## 7. Detail Peran Wilayah

Peran dan kapabilitas wilayah (`TeamRole`, `TeamPermission`) serta `TeamPolicy`
didokumentasikan secara otoritatif di `docs/role-permission.md` section 1 dan
section 6. Ringkas:

- `Owner` (Pemilik Wilayah) — semua kapabilitas wilayah (level 3).
- `Admin` (Pengelola Wilayah) — `UpdateTeam`, `CreateInvitation`,
  `CancelInvitation` (level 2).
- `Member` (Anggota Wilayah) — tanpa kapabilitas manajemen (level 1).
- `TeamRole::assignable()` mengecualikan `Owner` (tak bisa self-appoint).
