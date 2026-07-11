<laravel-boost-guidelines>
=== foundation rules ===

# Laravel Boost Guidelines

The Laravel Boost guidelines are specifically curated by Laravel maintainers for this application. These guidelines should be followed closely to ensure the best experience when building Laravel applications.

## Foundational Context

This application is a Laravel application and its main Laravel ecosystems package & versions are below. You are an expert with them all. Ensure you abide by these specific packages & versions.

- php - 8.3
- inertiajs/inertia-laravel (INERTIA_LARAVEL) - v3
- laravel/fortify (FORTIFY) - v1
- laravel/framework (LARAVEL) - v13
- laravel/prompts (PROMPTS) - v0
- laravel/wayfinder (WAYFINDER) - v0
- livewire/flux (FLUXUI_FREE) - v2
- livewire/livewire (LIVEWIRE) - v4
- larastan/larastan (LARASTAN) - v3
- laravel/boost (BOOST) - v2
- laravel/mcp (MCP) - v0
- laravel/pail (PAIL) - v1
- laravel/pint (PINT) - v1
- laravel/sail (SAIL) - v1
- phpunit/phpunit (PHPUNIT) - v12
- @inertiajs/react (INERTIA_REACT) - v3
- react (REACT) - v19
- tailwindcss (TAILWINDCSS) - v4
- @laravel/vite-plugin-wayfinder (WAYFINDER_VITE) - v0
- eslint (ESLINT) - v9
- prettier (PRETTIER) - v3

## Skills Activation

This project has domain-specific skills available in `**/skills/**`. You MUST activate the relevant skill whenever you work in that domain—don't wait until you're stuck.

## Conventions

- You must follow all existing code conventions used in this application. When creating or editing a file, check sibling files for the correct structure, approach, and naming.
- Use descriptive names for variables and methods. For example, `isRegisteredForDiscounts`, not `discount()`.
- Check for existing components to reuse before writing a new one.

## Verification Scripts

- Do not create verification scripts or tinker when tests cover that functionality and prove they work. Unit and feature tests are more important.

## Application Structure & Architecture

- Stick to existing directory structure; don't create new base folders without approval.
- Do not change the application's dependencies without approval.

## Frontend Bundling

- If the user doesn't see a frontend change reflected in the UI, it could mean they need to run `bun run build`, `bun run dev`, or `composer run dev`. Ask them.

## Documentation Files

- You must only create documentation files if explicitly requested by the user.

## Replies

- Be concise in your explanations - focus on what's important rather than explaining obvious details.

=== boost rules ===

# Laravel Boost

## Tools

- Laravel Boost is an MCP server with tools designed specifically for this application. Prefer Boost tools over manual alternatives like shell commands or file reads.
- Use `database-query` to run read-only queries against the database instead of writing raw SQL in tinker.
- Use `database-schema` to inspect table structure before writing migrations or models.
- Use `get-absolute-url` to resolve the correct scheme, domain, and port for project URLs. Always use this before sharing a URL with the user.
- Use `browser-logs` to read browser logs, errors, and exceptions. Only recent logs are useful, ignore old entries.

## Searching Documentation (IMPORTANT)

- Always use `search-docs` before making code changes. Do not skip this step. It returns version-specific docs based on installed packages automatically.
- Pass a `packages` array to scope results when you know which packages are relevant.
- Use multiple broad, topic-based queries: `['rate limiting', 'routing rate limiting', 'routing']`. Expect the most relevant results first.
- Do not add package names to queries because package info is already shared. Use `test resource table`, not `filament 4 test resource table`.

### Search Syntax

1. Use words for auto-stemmed AND logic: `rate limit` matches both "rate" AND "limit".
2. Use `"quoted phrases"` for exact position matching: `"infinite scroll"` requires adjacent words in order.
3. Combine words and phrases for mixed queries: `middleware "rate limit"`.
4. Use multiple queries for OR logic: `queries=["authentication", "middleware"]`.

## Artisan

- Run Artisan commands directly via the command line (e.g., `php artisan route:list`). Use `php artisan list` to discover available commands and `php artisan [command] --help` to check parameters.
- Inspect routes with `php artisan route:list`. Filter with: `--method=GET`, `--name=users`, `--path=api`, `--except-vendor`, `--only-vendor`.
- Read configuration values using dot notation: `php artisan config:show app.name`, `php artisan config:show database.default`. Or read config files directly from the `config/` directory.

## Tinker

- Execute PHP in app context for debugging and testing code. Do not create models without user approval, prefer tests with factories instead. Prefer existing Artisan commands over custom tinker code.
- Always use single quotes to prevent shell expansion: `php artisan tinker --execute 'Your::code();'`
  - Double quotes for PHP strings inside: `php artisan tinker --execute 'User::where("active", true)->count();'`

=== php rules ===

# PHP

- Always use curly braces for control structures, even for single-line bodies.
- Use PHP 8 constructor property promotion: `public function __construct(public GitHub $github) { }`. Do not leave empty zero-parameter `__construct()` methods unless the constructor is private.
- Use explicit return type declarations and type hints for all method parameters: `function isAccessible(User $user, ?string $path = null): bool`
- Use TitleCase for Enum keys: `FavoritePerson`, `BestLake`, `Monthly`.
- Prefer PHPDoc blocks over inline comments. Only add inline comments for exceptionally complex logic.
- Use array shape type definitions in PHPDoc blocks.

=== deployments rules ===

# Deployment

- Laravel can be deployed using [Laravel Cloud](https://cloud.laravel.com/), which is the fastest way to deploy and scale production Laravel applications.

=== tests rules ===

# Test Enforcement

- Every change must be programmatically tested. Write a new test or update an existing test, then run the affected tests to make sure they pass.
- Run the minimum number of tests needed to ensure code quality and speed. Use `php artisan test --compact` with a specific filename or filter.

=== inertia-laravel/core rules ===

# Inertia

- Inertia creates fully client-side rendered SPAs without modern SPA complexity, leveraging existing server-side patterns.
- Components live in `resources/js/pages` (unless specified in `vite.config.js`). Use `Inertia::render()` for server-side routing instead of Blade views.
- ALWAYS use `search-docs` tool for version-specific Inertia documentation and updated code examples.
- IMPORTANT: Activate `inertia-react-development` when working with Inertia client-side patterns.

# Inertia v3

- Use all Inertia features from v1, v2, and v3. Check the documentation before making changes to ensure the correct approach.
- New v3 features: standalone HTTP requests (`useHttp` hook), optimistic updates with automatic rollback, layout props (`useLayoutProps` hook), instant visits, simplified SSR via `@inertiajs/vite` plugin, custom exception handling for error pages.
- Carried over from v2: deferred props, infinite scroll, merging props, polling, prefetching, once props, flash data.
- When using deferred props, add an empty state with a pulsing or animated skeleton.
- Axios has been removed. Use the built-in XHR client with interceptors, or install Axios separately if needed.
- `Inertia::lazy()` / `LazyProp` has been removed. Use `Inertia::optional()` instead.
- Prop types (`Inertia::optional()`, `Inertia::defer()`, `Inertia::merge()`) work inside nested arrays with dot-notation paths.
- SSR works automatically in Vite dev mode with `@inertiajs/vite` - no separate Node.js server needed during development.
- Event renames: `invalid` is now `httpException`, `exception` is now `networkError`.
- `router.cancel()` replaced by `router.cancelAll()`.
- The `future` configuration namespace has been removed - all v2 future options are now always enabled.

=== laravel/core rules ===

# Do Things the Laravel Way

- Use `php artisan make:` commands to create new files (i.e. migrations, controllers, models, etc.). You can list available Artisan commands using `php artisan list` and check their parameters with `php artisan [command] --help`.
- If you're creating a generic PHP class, use `php artisan make:class`.
- Pass `--no-interaction` to all Artisan commands to ensure they work without user input. You should also pass the correct `--options` to ensure correct behavior.

### Model Creation

- When creating new models, create useful factories and seeders for them too. Ask the user if they need any other things, using `php artisan make:model --help` to check the available options.

## APIs & Eloquent Resources

- For APIs, default to using Eloquent API Resources and API versioning unless existing API routes do not, then you should follow existing application convention.

## URL Generation

- When generating links to other pages, prefer named routes and the `route()` function.

## Testing

- When creating models for tests, use the factories for the models. Check if the factory has custom states that can be used before manually setting up the model.
- Faker: Use methods such as `$this->faker->word()` or `fake()->randomDigit()`. Follow existing conventions whether to use `$this->faker` or `fake()`.
- When creating tests, make use of `php artisan make:test [options] {name}` to create a feature test, and pass `--unit` to create a unit test. Most tests should be feature tests.

## Vite Error

- If you receive an "Illuminate\Foundation\ViteException: Unable to locate file in Vite manifest" error, you can run `bun run build` or ask the user to run `bun run dev` or `composer run dev`.

=== wayfinder/core rules ===

# Laravel Wayfinder

Use Wayfinder to generate TypeScript functions for Laravel routes. Import from `@/actions/` (controllers) or `@/routes/` (named routes).

=== livewire/core rules ===

# Livewire

- Livewire allow to build dynamic, reactive interfaces in PHP without writing JavaScript.
- You can use Alpine.js for client-side interactions instead of JavaScript frameworks.
- Keep state server-side so the UI reflects it. Validate and authorize in actions as you would in HTTP requests.

=== pint/core rules ===

# Laravel Pint Code Formatter

- If you have modified any PHP files, you must run `vendor/bin/pint --dirty --format agent` before finalizing changes to ensure your code matches the project's expected style.
- Do not run `vendor/bin/pint --test --format agent`, simply run `vendor/bin/pint --format agent` to fix any formatting issues.

=== phpunit/core rules ===

# PHPUnit

- This application uses PHPUnit for testing. All tests must be written as PHPUnit classes. Use `php artisan make:test --phpunit {name}` to create a new test.
- If you see a test using "Pest", convert it to PHPUnit.
- Every time a test has been updated, run that singular test.
- When the tests relating to your feature are passing, ask the user if they would like to also run the entire test suite to make sure everything is still passing.
- Tests should cover all happy paths, failure paths, and edge cases.
- You must not remove any tests or test files from the tests directory without approval. These are not temporary or helper files; these are core to the application.

## Running Tests

- Run the minimal number of tests, using an appropriate filter, before finalizing.
- To run all tests: `php artisan test --compact`.
- To run all tests in a file: `php artisan test --compact tests/Feature/ExampleTest.php`.
- To filter on a particular test name: `php artisan test --compact --filter=testName` (recommended after making a change to a related file).

=== inertia-react/core rules ===

# Inertia + React

- IMPORTANT: Activate `inertia-react-development` when working with Inertia React client-side patterns.

</laravel-boost-guidelines>

<multi-agent-swarm-coordination>
=== agent swarm coordination ===

# Multi-Agent / Multi-Sub-Agent Swarm Coordination

Goal: finish the task as FAST and EFFICIENT as possible, while never
overwriting each other, never blind-reverting, and never dead-stopping.
Parallelism is a speed tool, not a default. On any collision an agent WAITs,
reconciles, then CONTINUES its flow.

## Speed-first rule (default)

DEFAULT = EXACTLY ONE orchestrator agent. That single agent thinks about the
fastest strategy, decomposes the work into independent slices, then fans out
via SUB-AGENTS and/or multiple parallel runs. Do NOT spawn N independent
top-level agents by default — that multiplies coordination overhead and is
SLOWER, not faster. One brain plans; many hands execute.

- 1 orchestrator reasons once, reuses context, owns the strategy.
- It delegates only parts that are truly independent and parallelizable.
- Sub-agents are CHEAP to spawn (via `spawn_agent`) on disjoint file scopes —
  use them freely for parallel execution.
- Escalate to many independent top-level sessions ONLY if the orchestrator
  itself is the bottleneck (huge unrelated workstreams, different repos).

> Root cause of past collisions: agents shared one worktree (`feat/hasban-update`)
> + shared `scratch_stitch/`. Fix = per-agent worktree/branch + claim board +
> advisory lock, coordinated by ONE orchestrator.

## Strategy playbook (pick the fastest safe shape)

- Tiny task (1 file, 1 concern): NO parallelism. Do it inline. Fastest = zero overhead.
- One feature, many independent files: 1 orchestrator + N sub-agents, each a disjoint file glob. Orchestrator composes the result.
- Many unrelated features: orchestrator splits into feature branches; each sub-agent gets its own worktree+branch via `spawn_agent` with a distinct scope.
- Shared-resource step (migrate, lockfile, pint): orchestrator runs it ONCE, serialized with `lock()`, then sub-agents proceed.

## Non-negotiable principles

1. Speed first, but collision-safe: parallelize only independent slices; serialize shared resources.
2. ONE orchestrator by default. Delegate via sub-agents / parallel runs, not by cloning the planner.
3. One (sub-)agent = one git worktree = one branch. Never two on the same worktree or branch.
4. Claim file ownership before editing. No agent edits a file it did not claim.
5. Serialize ONLY shared, order-sensitive resources (composer.lock, bun.lockb, database/migrations, `pint --dirty`, artisan caches, `.env`). Everything else runs free in parallel.
6. Never `git stash` / `git checkout --` / `git reset` / `git revert` another agent's work. Recover by rebase + merge.
7. Commit atomically and often ON YOUR OWN BRANCH. Integration is a separate, serialized step.
8. On collision: pause, lock, reconcile, continue. Never abandon the flow.

## Detailed collision cases (catalog)

| # | Case | Why it breaks | Prevention |
|---|------|---------------|------------|
| 1 | Same-file write race | A and B edit `User.php`; last write wins, the other's logic vanishes and tests error or reverse | File ownership manifest + per-agent worktree |
| 2 | Commit/push race | A commits & pushes; B commits then push is rejected (non-fast-forward) or B force-pushes and drops A | Separate branches; integration via merge, never `--force` |
| 3 | Stash clobber (reported) | A commits; B runs `git stash` assuming WIP, hiding/A's work under B | Never stash others; if you must, label + log in board |
| 4 | Rebase race | A rebases branch; B merges same base -> duplicate/conflicting commits | Rebase only inside your worktree after `git fetch` |
| 5 | Migration order clash | Both `make:migration`; same timestamp bucket or both alter same table -> `migrate` fails / data loss | Serialized migration lock; one agent owns `database/migrations` |
| 6 | Lock-file race | Both `composer require` / `bun add`; lock overwritten -> dependency drift, install fails | Serialized `composer.lock` / `bun.lockb` lock |
| 7 | Pint churn | Both `pint` over overlapping set, re-stage each other's formatting | Serialized `pint --dirty` lock; only format your claimed files |
| 8 | Artisan cache race | A `config:cache`; B `config:clear` mid-run -> app breaks for B | Serialized cache commands; prefer per-worktree cache |
| 9 | Shared DB state | A seeds/migrates/truncates; B's tests assert on that data -> flaky failures | Per-agent test DB (`DB_DATABASE=kopera_<agent>`) |
| 10 | `.env` edits | Both add keys; one silently drops the other | Serialized `.env` edits; document keys in board |
| 11 | Generated-file race | Wayfinder (`@/actions`,`@/routes`) / Ziggy / Vite regenerated concurrently -> partial file | Serialized generation step |
| 12 | New-file name clash | Both `make:model`/`make:test` same name -> create conflict/overwrite | Claim names up front; namespace by agent |
| 13 | Autoload race | Both `composer dump-autoload` while files added -> missing class | Serialized after adding classes |
| 14 | Scratch artifact clash | Agents write `scratch_stitch/*.html` same name -> overwrite | Per-agent scratch dir (`scratch_stitch/<agent>/`) |
| 15 | Port/PID clash | Both `bun run dev` / `artisan serve` same port -> bind fail | Per-worktree port or stop shared dev server |
| 16 | Git index lock | Two git processes write `.git/index.lock` -> "Unable to create .git/index.lock" | One git op at a time; use worktrees so index is separate |
| 17 | AI rollback loop | Agent sees a diff it didn't make, assumes error, reverts it (the "reverse" observed) | Treat unknown diffs as another agent's WIP, NOT an error |
| 18 | Coverage/test cache clash | Parallel `phpunit` writing same coverage/build dir | Per-agent `--coverage-...`/build path or `--filter` only owned tests |
| 19 | `git add -A` sweep | One agent sweeps another's WIP into its commit | `git add` only claimed paths explicitly |
| 20 | Sub-agent scope overlap | Parent spawns two sub-agents with overlapping file scopes | Disjoint write scopes per sub-agent |

## Concrete protocol

### A. Per-agent isolation (do this first)
```sh
AGENT=agent-a
BR=feat/hasban-update/$AGENT
git worktree add -b "$BR" .worktrees/$AGENT feat/hasban-update
cd .worktrees/$AGENT
```
Every agent AND every sub-agent gets its own worktree + branch. Work never
touches the main worktree's files. Parent -> sub-agent must pass a DISTINCT
file scope + branch.

### B. Claim ownership (mission board)
Before editing, append one line to `.agent-board` in the repo root:
```
agent-a | resources/js/pages/admin/* | feat/hasban-update/agent-a | 2026-07-11T04:40Z
```
Two agents claiming the same glob -> the later one picks a different file set
or waits for the lock. Sub-agents must claim a disjoint subset.

### C. Serialize shared resources with an advisory lock
No native cross-agent file lock, so use a lock-dir + busy-wait (wait, then
continue - never crash):
```sh
lock() {            # usage: lock <name> <command...>
  name=$1; shift
  while ! mkdir ".locks/$name" 2>/dev/null; do sleep 2; done
  trap 'rmdir ".locks/$name" 2>/dev/null' EXIT
  "$@"
}

lock composer.lock composer require spatie/once
lock migrations    bash -c 'php artisan migrate --force'
lock pint          vendor/bin/pint --dirty --format agent
lock lockfiles     bash -c 'git add composer.lock bun.lockb && git commit -m "deps: lockfiles"'
```
The agent WAITs (sleep + retry), runs the command, releases the lock, and
continues its flow. `.locks/` must be git-ignored.

### D. Git discipline
- Commit on YOUR branch, small atomic commits: `git commit -m "agent-a: <what>"`.
- If the base advanced, rebase ONLY inside your worktree: `git fetch && git rebase origin/feat/hasban-update`.
- Never `git stash` blindly. If unavoidable: `git stash push -m "agent-a-<ts>"` and record it in `.agent-board`.
- Integrate via merge/PR to the base, orchestrated by a single serialized "integrator" step. Never auto `--force` push.

### E. Database / test isolation
- Each agent uses its own test DB: `DB_DATABASE=kopera_$AGENT` in its worktree `.env`.
- Run `php artisan test --compact --filter=...` for ONLY the files you own; never wipe a shared DB.

### F. Recovery (when a collision is found - DO NOT blind-revert)
1. Pause ONLY the conflicting step; acquire that resource's lock.
2. `git fetch` + `git rebase` your branch onto the latest base. Resolve conflicts in ONLY your claimed files. If the conflict is in another agent's file, coordinate - do not overwrite.
3. If you see a diff you did not author, assume it is another agent's WIP, NOT an error. Do not `git checkout --` it.
4. After reconciling, re-run the step, commit, and continue the remaining flow. The flow is never abandoned.

## Integrator / Commander (single point of merge)

To keep the main flow conflict-free, designate ONE agent as the integrator
(usually the orchestrator). It is the ONLY agent allowed to merge sub-agent
branches into the base (`feat/hasban-update`). Everything else stays isolated
on its own branch until the integrator pulls it in, in a chosen order.

Responsibilities:
- Decide merge ORDER to minimize conflicts. Rule of thumb:
  1. Order-sensitive first: migrations / schema, then `composer.lock` &
     `bun.lockb` (lockfiles), then shared config, then features.
  2. Leaf branches (disjoint file globs) can be merged in any order; merges
     are still done one-at-a-time to avoid index races.
  3. If two pending branches touch overlapping files, merge the smaller /
     lower-risk one first, then rebase the other onto the new base.
- Merge with `--no-ff` so each integration is a visible, reversible unit:
  `git merge --no-ff feat/hasban-update/agent-a -m "integrate: agent-a"`.
- After each merge: run `vendor/bin/pint --dirty` and the affected tests on
  the base before taking the next branch. Keeps main flow always green.
- Never merge a branch whose owner sub-agent reports red tests. Bounce it back.

## Conflict & rollback management (fast + safe)

No force-push, no blind `git checkout --`, no `git reset` of others' work —
those CREATE the collisions/rollbacks you saw. Instead:

Conflict during merge (integrator):
1. `git merge` hits conflicts -> stop, do NOT abort carelessly.
2. Resolve only the conflicting hunks on the BASE branch, keeping both
   intended behaviors. If unsure whose intent wins, ping the sub-agent owner
   via `.agent-board`; do not guess.
3. `git add <resolved>`; `git commit` (merge commit). Run tests; if green,
   continue. If the conflict is large, prefer: `git merge --abort`, then
   `git rebase origin/feat/hasban-update` the sub-agent branch and have that
   agent re-test, then merge again.

Rollback (fast):
- Pre-merge bad change: simply don't merge the branch. Main flow untouched.
- Already-merged bad change: `git revert -m 1 <merge-commit>` on the base -
  creates an inverse commit, history stays, no force-push, clones stay valid.
  Then tell the sub-agent to fix on its branch and re-merge.
- Partial WIP loss risk is bounded: each agent commits OFTEN on its own
  branch, so worst-case loss is one agent's uncommitted WIP in its own
  worktree - never another agent's committed work.
- Emergency only: `git reset --hard` is allowed SOLELY on your own worktree's
  branch, never on `feat/hasban-update` and never on another agent's branch.

## One-line rules for agents
one-orchestrator-default · worktree-per-agent · branch-per-agent · claim-glob-first ·
lock-only-shared · commit-often-own-branch · wait-dont-crash ·
rebase-dont-revert · never-stash-others.
</multi-agent-swarm-coordination>

<no-emoji-rule>
=== professional communication rule ===

# No Emoji - Use Professional Marks Only

STRICT: no emoji anywhere - code, comments, commit messages, docs, PR
titles, or agent replies. Emoji are unprofessional, break screen readers,
render inconsistently across terminals/IDEs, and add noise.

ALLOWED icons (non-emoji unicode glyphs or ASCII) - use only to aid scanning:
- Status / checks: `PASS` `FAIL` `OK` `DONE` `[x]` `[ ]` + glyphs
  `\u2713` (check) `\u2717` (cross) `\u2192` (arrow) `\u2022` (bullet)
  `\u25B8` (triangle) `\u00A7` `#`.
- Doc structure: Markdown headings (`##`), `-` bullets, numbered lists, tables.
- Log / commit prefixes: bracketed words `[feat]` `[fix]` `[chore]` `[agent-a]`.

PREFER plain words in prose. Never use colorful pictographs.

FORBIDDEN (examples): \uD83D\uDE80 \u2705 \u274C \u26A0\uFE0F \uD83D\uDD25
\uD83D\uDCA1 \uD83D\uDC1B \uD83E\uDD16 \uD83D\uDE4F \uD83D\uDC4D

ALLOWED instead: `[feat]` / `PASS` / `FAIL` / `->` / plain words.

ENFORCE: strip any emoji from output before committing or replying.
</no-emoji-rule>
