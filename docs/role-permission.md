# Role & Permission Analysis

Analysis of the role and permission model in this application: how the two
existing systems fit together, the gaps and ambiguities that remain, and the
rationale ("why a/b/c") behind the chosen structure. Written for the
role/permission flow owner.

## 1. Two parallel systems

The app does **not** have a single RBAC. It has two independent layers that
overlap only by coincidence of naming.

| Layer | Scope | Source of truth | Enforcement |
|-------|-------|-----------------|-------------|
| Platform role | Whole-account (who you are globally) | Spatie `Role` rows + `UserRole` enum | `role:` route middleware, `hasRole()`, `EnsureUserRole` |
| Team role | Per-team membership | `TeamRole` enum on `team_members.role` pivot | `TeamPolicy` + `hasTeamPermission()`, enum-driven |

### Platform layer (`UserRole` + Spatie)
- Roles: `explorer`, `member`, `administrator` (see `app/Enums/UserRole.php`).
- Stored as Spatie `Role` rows (`guard_name = web`).
- A `User` uses `Spatie\Permission\Traits\HasRoles`.
- Routing diverges by role in `RedirectsToCurrentTeam` and `routes/web.php`:
  - `administrator` -> `/admin-dashboard` (`role:administrator`)
  - `explorer` -> `/explorer-dashboard` (`role:explorer|administrator`)
  - else (member) -> personal/selected team dashboard.

### Team layer (`TeamRole` + `TeamPermission`)
- Roles: `owner`, `admin`, `member` (see `app/Enums/TeamRole.php`, fully self-contained).
- Permissions are defined in code as the `TeamPermission` enum and mapped
  per role inside `TeamRole::permissions()`.
- Authorization is fully enum-driven (`hasTeamPermission()`, `TeamPolicy`),
  and does **not** touch the Spatie permission tables at all.

## 2. Gaps and ambiguities found

### GAP A - Platform permissions were never seeded (incomplete seeder)
`RoleSeeder` created only the three `Role` rows. The Spatie `permissions`
and `role_has_permissions` tables stayed empty, so `User::can(...)`,
`hasPermissionTo()`, and the entire platform capability layer did nothing.
Roles were therefore only enforceable by *name* (`hasRole('administrator')`),
not by *capability*. This made "role and permission seeder" a misnomer.

Fix: introduced `App\Enums\UserPermission` (mirrors `TeamPermission`) and
extended `RoleSeeder` to create each permission and attach it to the matching
role via `syncPermissions()`.

### GAP B - `administrator` was self-assignable at registration (security hole)
`UserRole::assignable()` returned **every** role, and `CreateNewUser`
validated the incoming `role` against a hardcoded
`['explorer', 'member', 'administrator']`. A visitor could register as
`administrator` on the public form and immediately reach `/admin-dashboard`
and any `role:administrator` route.

Why `administrator` must be excluded (a/b/c):
- (a) Admin is a privilege grant, not a self-service choice; exposing it on a
  public form lets any anonymous visitor claim full platform control.
- (b) The seeder/`UserSeeder` already provisions the admin account, so the
  form does not need to offer it.
- (c) Consistency: `TeamRole::assignable()` already hides `owner` for the same
  reason (you cannot appoint yourself the team owner via the member form).

Fix: `UserRole::assignable()` now rejects `Administrator`, and
`CreateNewUser` validates against `UserRole::assignable()` instead of a
hardcoded list (also removes the drift where the two lists could diverge).

### GAP C - Drift between `CreateNewUser` and `UserRole`
The registration validation hardcoded the role list instead of reusing
`UserRole`. If `UserRole` gained or lost a case, the form would silently go
out of sync. Now both the form and the seeder derive from the enum.

### GAP D - No capability-driven platform authorization
Routes still gate on role name (`role:` middleware), not on permissions.
`profile:view`, `admin:users`, etc. exist as seeds but are not yet referenced
by `Gate`/`Policy`/middleware. This is the intended next step (the
`UserRole` enum comment already notes "wired into policies later"). Seed the
capability layer now so enforcement can switch from role-name to
`$user->can(UserPermission::...)` without another schema/migration change.

### GAP E - Platform role vs team role are never reconciled
A user has a global `UserRole` *and* a `TeamRole` in every team. There is no
rule stating whether `administrator` may act inside any team, or whether a
team `owner` gains anything platform-wide. Today they are fully independent.
This is acceptable but must be a documented decision, not an accident.

Recommendation: keep them independent (platform = account tier, team = per-org
membership), and forbid cross-application in code. If a need arises for
"platform admin can enter any team", express it as an explicit gate (e.g.
`$user->can(UserPermission::AdminAccess)` short-circuit in `TeamPolicy`),
never by silently reading the platform role inside team logic.

## 3. Permission matrix (as seeded)

| Permission (value) | Explorer | Member | Administrator |
|--------------------|:--------:|:------:|:------------:|
| `profile:view`         | x | x | x |
| `profile:update`       | x | x | x |
| `explorer:access`      | x |   | x |
| `member:access`        |   | x | x |
| `workspace:access`     |   | x | x |
| `assistant:access`     |   | x | x |
| `admin:access`         |   |   | x |
| `admin:users`          |   |   | x |
| `admin:roles`          |   |   | x |

`Administrator` receives every `UserPermission::cases()` (superuser), so the
row is forward-compatible when new permissions are added.

## 4. How the seeder works

`RoleSeeder::run()`:
1. Create one Spatie `Permission` per `UserPermission` case (idempotent via
   `firstOrCreate`).
2. For each `UserRole` case, create the `Role` and `syncPermissions()` from
   `UserRole::permissions()`.

`UserSeeder` stays unchanged in behavior: it provisions one demo account per
role (including `administrator`, which is the only sanctioned way to obtain
that role). Reruns are idempotent.

## 5. Extending the model

- Add a new platform capability: add a `case` to `UserPermission`, then grant
  it from `UserRole::permissions()`. No migration needed; re-run the seeder.
- Add a new platform role: add a `case` to `UserRole` + its permission map.
  Decide explicitly whether it is `assignable()` (self-service) or
  provisioned only.
- Enforce a capability: gate with `$user->can(UserPermission::AdminUsers)`
  / a `Policy` / middleware, instead of `hasRole('administrator')`.

## 6. Verification

- `tests/Feature/UserSeederTest` covers idempotency and that each demo user
  owns a personal team and has exactly one platform role.
- `tests/Feature/RoleSeederTest` (added) asserts each `UserPermission` exists
  as a `Permission` row and that role-to-permission attachments match
  `UserRole::permissions()`, including the administrator superuser row.
