# Validation and release evidence

## Current evidence status

Validated locally on macOS on 2026-10-15. The active source remains the unfinished
starter. Reference solutions were applied only in disposable copies.
Authenticated Copilot client workflows and live CI/cloud jobs are not claimed
as verified; those are separate product/account checks.

| Component | Intended target | Actual validated version/result |
|---|---|---|
| Node | 24 LTS | v24.14.1 |
| npm | bundled compatible npm | 11.11.0 |
| pnpm | 10 | 10.34.6 via isolated npm tool cache |
| Git | local cloning and practice branches | 2.53.0 |
| npm lock | lockfileVersion3 | Generated with npm; clean npm ci, no lock drift |
| pnpm lock | format9 | Generated with pnpm; clean frozen install, no lock drift |
| Browser | modern browser | Chromium 156.0.8078.4 through session-only Playwright 1.64.1 |
| VS Code / CLI / desktop app | organization-approved current clients | Not authenticated/rehearsed |
| Cloud delegation | presenter-owned writable GitHub repo | Not launched |

Actual results:

- `npm run setup:check` and `npm run verify`: exit 0, 12 baseline tests passed,
  zero failures/skips; JS syntax and all 25 Markdown documents' local link paths,
  customization frontmatter and documented script names checked.
- `npm run validate:matrix`: exit 0, all eight combinations matched the table
  below. Eight baseline runs passed; 12 selected-lab suites passed and 12
  unfinished-lab suites produced only the intended assertion failures.
- Separate fresh npm and pnpm copies: install, preflight and verification all
  exited 0, with both lockfiles unchanged. npm preflight also passed with no
  standalone pnpm executable installed.
- Actual `npm start` and `pnpm start` served the current starter and returned
  `FreshCart Ops ready` over HTTP. An unrelated service already occupied port
  3000, so startup correctly reported `EADDRINUSE`; it was not stopped. npm was
  then checked on port 3002 and pnpm on 3001 using the documented `PORT` override.
- 53 real-browser/print checks passed across all eight combinations, including
  search/filter combinations, Needs attention, prices, manual and suggested
  replacement, persistence/reset, invalid inputs, keyboard focus, and 390px /
  1440px layouts. No uncaught browser errors.
- Storage-read and storage-write failures were exercised. Failed saves restore
  the visible basket/order to the unchanged state and display an explicit error.
- Seven actual CLI/TTY recovery checks passed: preview, noninteractive refusal,
  cancelled confirmation, confirmed modified-file backup, repeated application,
  unsafe-path refusal and a simulated partial I/O failure with both backups intact.
  The baseline also covers stale preview and symlink refusal.
- The quick-reference PDF contained exactly one page for A4 and one for Letter,
  at 100% scale without headers/footers; page/body bounds did not clip content.
- Both workflow YAML files and all eight customization frontmatter documents
  parsed successfully. Official product-source links were checked, including
  the current cloud environment guide. No hosted workflow was launched.

Browser tooling was isolated outside the repository and is not an application
dependency or attendee prerequisite. All temporary validation copies and helper
servers were removed/stopped. Preserve this distinction when updating evidence.

The sections below explain how maintainers can reproduce the checks. Do not turn
these results into claims about untested browsers, operating systems, printers
or authenticated Copilot surfaces.

## Baseline and document checks

In the applied source tree with Node24:

```sh
node --version
npm --version
pnpm --version
npm run setup:check
npm run verify
```

For a pnpm-only check, use `pnpm run setup:check` and `pnpm run verify`; a release
maintainer tests both managers, but an npm participant does not need pnpm.
`verify` checks JS syntax, baseline Node tests, local Markdown linked paths,
customization frontmatter and named script presence. It does not validate every
external URL, client interaction, Markdown anchor or browser layout.

Inspect every baseline failure. The baseline should pass on starter and every
solution combination. Do not weaken assertions to produce a green report.

## Generate real lockfiles and test fresh installs

In an authorized disposable source copy, use `npm install --package-lock-only`
and `pnpm install --lockfile-only` to have the actual package managers generate
the dependency-free locks. Review changes, then use those locks in two NEW
clean copies. Do not share node_modules between the copies.

In the npm copy:

```sh
npm ci
npm run setup:check
npm run verify
```

In the pnpm copy:

```sh
pnpm install --frozen-lockfile
pnpm run setup:check
pnpm run verify
```

Record actual versions and exit statuses. Confirm lockfiles do not drift after
clean installation. Confirm npm preflight works on a workstation without pnpm.
There is intentionally no exclusive `packageManager` field.

If the maintainer's global runtime differs, use an already-approved version
manager to select Node24 only for these copies. Do not silently validate on a
different major and report Node24 success; do not change unrelated projects.

## Prove deliberate failures and all eight combinations

First run the three acceptance scripts on the untouched starter. Each must
fail with the intended behavioral assertion, not a syntax/module error:

```sh
npm run test:lab1
npm run test:lab2
npm run test:lab3
npm run validate:matrix
```

pnpm equivalents replace `npm` with `pnpm`. The matrix script creates uniquely
named temporary copies, applies only chosen reference files with explicit
programmatic confirmation, runs baseline and all three acceptance suites, and
removes only its own temporary directories. It never fixes the active starter.

Combination order is Lab1/Lab2/Lab3:

| Combination | Baseline | Lab1 | Lab2 | Lab3 |
|---|---|---|---|---|
| 000 | pass | expected fail | expected fail | expected fail |
| 100 | pass | pass | expected fail | expected fail |
| 010 | pass | expected fail | pass | expected fail |
| 110 | pass | pass | pass | expected fail |
| 001 | pass | expected fail | expected fail | pass |
| 101 | pass | pass | expected fail | pass |
| 011 | pass | expected fail | pass | pass |
| 111 | pass | pass | pass | pass |

The matrix runs against an unfinished starter tree. Running it from your
already-solved practice tree is the wrong release input and should expose an
unexpected pass. Do not make the validator silently bless a fixed starter.

## Recovery checks

`node --test test/recovery.test.js` covers preview/refusal with no writes,
preexisting target edits preserved in backups, untouched unrelated labs,
repeated application, stale previews, unsafe paths, symlink refusal, both Lab3
files and temporary paths containing spaces. Inspect any explicit Windows
symlink-privilege skip; perform the refusal check on a supported host before
claiming it passed.

Also manually run an interactive `--apply`, answer something other than YES,
and compare status/content. Then approve YES in a disposable clone, inspect the
printed backup and receipt, and compare original and replacement contents.
Simulate a write failure only in a disposable clone if required by your local
filesystem policy; confirm a clear error and preserved backup rather than a
success message. Do not damage a participant checkout to test recovery.

## Real browser and HTTP verification

Node HTTP tests check routes, MIME/security headers, malformed paths, private
file refusal, HEAD and unsupported methods. Separately start the server in a
temporary validation copy and inspect its printed path.

| Browser action | Required observation |
|---|---|
| Open at desktop width | 24 cards, basket and unavailable seeded order, no page errors |
| Search oat, then choose Produce, then clear search | AND filtering and clear empty state |
| Set granola3 on starter | $3.49, demonstrating the known bug |
| Add/remove basket lines and reload | Correct quantities, totals and persisted local state |
| Enter fractional/empty/overstock quantity | Explicit visible error; invalid state not saved |
| Manual replacement on starter | Order changes and feedback appears before any Lab3 fix |
| Cancel Reset demo data | Current basket/order unchanged |
| Confirm Reset demo data | Seed basket/order restored; source unaffected |
| Corrupt only freshcart-ops-v1 localStorage in a disposable browser profile | Explicit error, seed preview, editing refused until reset |
| Lab1 solution | Low: BAN-001, SPIN-001, BERRY-001; out: OAT-001, AVO-001; Needs attention: all five |
| Lab2 solution | q3=698 cents, q5=1047, separate single SKUs=698 |
| Lab3 solution | Ordered explained candidates, no automatic replacement |
| Click OAT-003 replacement | Order/feedback update; reload persists selection |
| No-match fixture | No stale buttons; clear no-match; no order mutation |
| Keyboard-only navigation | Visible focus, labeled controls, reachable actions |
| 390px and 1440px viewports | No horizontal clipping, usable cards/basket/actions |

For the no-match browser fixture, use an authorized temporary validation copy,
not active starter: set the seed request's `requiredTags` to `['unavailable-tag']`,
reset only that browser's demo data, then request suggestions. Restore or discard
only that temporary copy after evidence collection. The automated no-match test
already passes an empty catalog and does not require production debug hooks.

An optional browser-automation harness may be used by maintainers from their
existing approved tooling. Browser binaries or QA dependencies are NOT required
attendee setup. Do not download tools just to claim a check; report unavailable
browser automation and perform genuine manual inspection instead.

Stop every validation server with Ctrl+C or its exact process handle. Confirm
the port no longer responds before switching copies. Never kill all Node
processes or leave hidden helper servers running.

## Print, documentation and product checks

Open `docs/quick-reference.html` directly in a browser and print-preview at
100%, portrait, headers/footers off. Check A4 AND Letter. Each must be exactly
one page with readable text and no clipped content. Record both page counts;
CSS dimensions alone do not prove pagination.

Follow setup and each numbered lab step exactly, including paste prompts and
checkpoints. Check internal links/anchors, external source links, npm/pnpm
equivalents, path-space handling and app/CLI click paths in the actual clients.
Rehearse custom agent/skill discovery. Manually confirm auth, entitlements and
policies. Do not claim a live cloud launch: cloud execution is optional and
separately authorized, not a required local validation check.

## Final local release gate

Inspect `git status`, the full staged tree and active unfinished module contents.
Commit only when explicitly authorized, with any required tool trailers, and
create `workshop-v1` only after all required app checks above pass. Do not
force-move a tag. Report the actual commit/tag, tracked file count, validation
results and product-only unknowns. Leave no remote or helper process unless
separate publication/service authorization was given.
