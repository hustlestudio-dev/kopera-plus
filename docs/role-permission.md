# Role & Permission Model (KOPERA-PLUS)

Single, authoritative description of how role and permission checking works in
this application, written so a regression like "I am an explorer but I cannot
open the explorer dashboard" cannot reappear. Read this before touching any
route, redirect, or navigation link.

## 1. Two domains, one source of truth each

| Domain | Backend concept | User-facing language | Enforced by |
|--------|----------------|----------------------|-------------|
| Platform role | `UserRole` enum + Spatie `Role` rows | "Penjelajah / Anggota / Administrator" | `role:` route middleware, `RedirectsToCurrentTeam`, `UserRole::homePath()` |
| Wilayah Koperasi (team) | Laravel `Team` + `TeamRole` enum | "Wilayah Koperasi", roles "Pemilik/Anggota Wilayah" | `TeamPolicy`, `hasTeamPermission()`, enum-driven |

- **Platform role** = who you are across the whole account (tier). Stored as
  Spatie `Role` rows (`guard_name = web`); a `User` uses
  `Spatie\Permission\Traits\HasRoles`. Capabilities are stored as Spatie
  `Permission` rows seeded by `RoleSeeder`.
- **Wilayah Koperasi** = a cooperative region/area you belong to. The backend
  reuses Laravel Jetstream's `Team`, but every user-visible string says
  "Wilayah Koperasi" (see the rebrand list in section 6). The two domains are
  independent: a platform role does not imply a wilayah role and vice versa.

## 2. The capability model

- **Explorer / masyarakat**: browse, buy and transact products, and save
  (deposit / withdraw savings). Access ONLY the explorer area + savings.
- **Member / anggota**: access ONLY the E-RAT module. No shop, no savings.
- **Administrator**: full platform management (users, products, transactions,
  savings, E-RAT). Superuser = every capability. **Never self-registered**;
  provisioned only by a developer (seeder / artisan).

### Permission matrix (as seeded)

| Permission (value) | Explorer | Member | Administrator |
|--------------------|:--------:|:------:|:------------:|
| `profile:view`         | x | x | x |
| `profile:update`       | x | x | x |
| `shop:browse`          | x |   | x |
| `shop:purchase`        | x |   | x |
| `shop:transact`        | x |   | x |
| `savings:deposit`      | x |   | x |
| `savings:withdraw`     | x |   | x |
| `erat:access`          |   | x | x |
| `admin:users`          |   |   | x |
| `admin:products`       |   |   | x |
| `admin:transactions`   |   |   | x |
| `admin:savings`        |   |   | x |
| `admin:erat`           |   |   | x |

`Administrator` receives every `UserPermission::cases()` (superuser), so the
row stays forward-compatible when new permissions are added. The matrix is
derived entirely from `UserRole::permissions()` and locked by
`RoleSeederTest::test_role_capability_matrix_matches_the_model`.

## 3. Standardized role-permission checking (the fix)

There is exactly **one** place per layer that decides "what can this role
access / where does it land". Nothing else hard-codes role strings.

### Server (PHP)

- **Area / route access**: `routes/web.php` groups routes under the Spatie
  `role:` middleware (`role:explorer|administrator`, `role:member|administrator`,
  `role:administrator`). This is the single server-side gate for opening a page.
- **Post-login landing**: `App\Enums\UserRole::homePath(User $user)` returns the
  destination for each role. `RedirectsToCurrentTeam` (used by every Fortify
  login/register/verify response) iterates `UserRole::orderedForLanding()` and
  calls `homePath()` — it contains **no** raw `hasRole('explorer')` strings.
  Adding or renaming a role is a compile-time-exhaustive `match`, so a role
  can never silently fall through to the wrong page.

  Use this enum for any new role-to-path decision. Do NOT add a new
  `if ($user->hasRole('x'))` branch elsewhere.

### Client (TypeScript)

`resources/js/lib/permissions.ts` is the single source of truth:

- `ROLE` — platform role slugs, mirrored from `UserRole`.
- `ROUTE_ROLES` — `path -> allowed roles`, mirroring the `role:` groups in
  `routes/web.php`. Any path absent from the map is treated as public.
- `usePermissions()` — exposes `hasRole`, `hasAnyRole`, `hasPermission`,
  `canAccess(href)` (reads `auth.user.roles` / `auth.user.permissions` shared by
  `HandleInertiaRequests`).
- `roleHomePath(roles, teamSlug)` — client mirror of `UserRole::homePath()`,
  used by `welcome.tsx` so the landing button cannot drift from the server.

**Rule**: a navigation link is rendered only when `canAccess(item.href)` is
true, and a new `role:x|y` route MUST get the same pair in `ROUTE_ROLES`. The
welcome/landing screen uses `roleHomePath()`, not `user.roles.includes(...)`.

## 4. Capability-driven authorization (GAP D — still open, intentional)

Routes gate on **role name** (`role:` middleware), not yet on a `$user->can()`
capability. The capability layer (`UserPermission` seeds + `UserRole::
permissions()`) is fully seeded and ready, but enforcement is still role-name
based. When switching a route to capability gating, change the `role:` group to
a `permission:` middleware (registered in `bootstrap/app.php`) or a Gate/Policy,
and update `ROUTE_ROLES` / `hasPermission` accordingly. Until then, the role
matrix in section 2 is the contract.

## 5. Administrator is developer-only (security)

`UserRole::assignable()` excludes `Administrator`, and `CreateNewUser`
validates the incoming `role` against `assignable()` — so the public register
form cannot mint an admin. The only sanctioned path to the administrator role
is `UserSeeder` (dev-side) or an explicit developer/artisan provisioning. This
mirrors `TeamRole::assignable()` hiding `owner`. Locked by
`RoleSeederTest::test_administrator_is_not_self_assignable`.

## 6. Wilayah Koperasi rebrand (backend = Team, UI = Wilayah Koperasi)

The backend keeps Laravel's `Team` (conceptually identical), but user-visible
strings read "Wilayah Koperasi". Applied to:

- `TeamRole` labels: `Pemilik Wilayah` / `Pengelola Wilayah` / `Anggota Wilayah`.
- Sidebar / settings nav: "Tim" → "Wilayah Koperasi".
- `TeamSwitcher`: "Pilih tim" → "Pilih wilayah", "Tim" → "Wilayah Koperasi",
  "Tim baru" → "Wilayah baru".
- `CreateTeamModal` placeholder: "Tim saya" → "Wilayah saya".
- Personal team default name (seeder / factory / registration):
  `"<name>'s Wilayah Koperasi"`.

Code identifiers (`Team`, `team`, route paths like `/settings/teams`) are
unchanged on purpose — only display text changes.

## 7. How the seeder works (complete, not ambiguous)

`DatabaseSeeder` runs `RoleSeeder` then `UserSeeder`:

1. `RoleSeeder::run()` — for every `UserPermission::cases()` creates the Spatie
   `Permission` row (`firstOrCreate`); for every `UserRole::cases()` creates the
   `Role` and `syncPermissions()` from `UserRole::permissions()`. Idempotent.
2. `UserSeeder::run()` — provisions one demo account per role
   (`explorer@mail.com`, `member@mail.com`, `administrator@mail.com`), each with
   a personal wilayah and exactly the capabilities its role grants. Reruns are
   idempotent (`updateOrCreate` + guarded role assignment).

This resolves the earlier "incomplete seeder" gap: roles, permissions, and
role→permission attachments are all produced, so `$user->can(...)`,
`hasPermissionTo()`, and the platform capability layer are fully populated.

## 8. Extending the model

- New platform capability: add a `case` to `UserPermission`, then grant it from
  `UserRole::permissions()`. No migration; re-run the seeder. Update the matrix
  in section 2.
- New platform role: add a `case` to `UserRole` + its permission map + a
  `homePath()` arm (compile-time enforced). Decide if it is `assignable()`
  (self-service) or developer-only.
- New area route: add it under the correct `role:` group in `routes/web.php`
  **and** the matching entry in `ROUTE_ROLES` (client) + `homePath()` if it is a
  landing page.
- Enforce a capability instead of a role: move the gate to `permission:` /
  Policy and update `ROUTE_ROLES` + `hasPermission`.

## 9. Verification

- `tests/Feature/RoleSeederTest` — idempotent seeding, per-role permission
  attachments, the capability matrix (section 2), and admin-not-self-assignable.
- `tests/Feature/UserSeederTest` — each demo user owns a personal wilayah, has
  exactly one platform role, and carries exactly its role's capabilities; admin
  gets every permission.
- `tests/Feature/ProductionRoutesTest` — guest redirection, member reaches
  member areas only, explorer reaches the explorer dashboard only, admin
  reaches admin only.
