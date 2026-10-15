# Reference solutions and safe recovery

Reference solutions are separate complete implementations, not imports used by
the running starter. Only apply a solution in your own practice clone when you
choose to recover or compare. Do not apply them to the published starter main.

| Lab | Replaced active files |
|---|---|
| lab1 | `src/availability.js` |
| lab2 | `src/pricing.js` |
| lab3 | `src/substitutions.js`, `public/substitution-panel.js` |

## Preview first

In the correct clone, inspect `git status --short`, then choose a lab:

```sh
npm run solutions -- lab1 --preview
```

pnpm: `pnpm run solutions lab1 --preview`. Substitute `lab2` or `lab3` when
needed; there is deliberately no `all` shortcut. The preview prints the checkout,
exact target paths and before/after SHA-256 hashes. A hash identifies file
contents; it is not a test result. Preview must not write files or create backups.

Read the corresponding files in `solutions/labN/` before approving them. You can
compare the pair with `git diff --no-index -- src/availability.js solutions/lab1/src/availability.js`.
Exit code 1 from that comparison means files differ; it is not an apply failure.

## Apply with explicit confirmation

```sh
npm run solutions -- lab1 --apply
```

pnpm: `pnpm run solutions lab1 --apply`. Read the preview again, then type
exactly **YES** to approve. Any other answer cancels without changing files.
In a noninteractive shell, the script refuses to proceed without `--yes`.
After reviewing the preview, an operator may explicitly opt into
`npm run solutions -- lab1 --apply --yes` or
`pnpm run solutions lab1 --apply --yes`. Do not let an agent append this flag
without your decision.

The tool validates every manifest entry against a fixed per-lab path allowlist,
rejects absolute/traversal/backslash paths and symlinked files, checks for edits
since preview, and backs up all changed target files before replacing any.
Backups go to `.workshop-backups/labN-<timestamp>-<unique-id>/`, preserving paths.
`receipt.json` lists original/replacement hashes. The tool prints the actual
backup location. Never assume an example timestamp is your backup directory.

Existing edits inside those specific target files are preserved in the backup,
then replaced, not merged. Other lab files are untouched. A repeated apply of
identical files is a no-op and creates no new backup. Stop active agents before
applying so they cannot race with your preview.

The two-file Lab 3 apply is not a cross-file atomic transaction. Preflight and
backups happen before writes; if an I/O failure occurs during replacement, the
error names already replaced files and the backup. It does not claim success or
automatically overwrite newer work during rollback.

## Verify and compare

Run the baseline and the selected acceptance test, for example:

```sh
npm test
npm run test:lab1
git diff -- src/availability.js
```

pnpm: `pnpm test` and `pnpm run test:lab1`. Refresh the browser and check the
visible outcome. Applying source is not evidence it works.

## Restore your previous local edit without discarding work

Open the actual printed backup file in your editor beside its active target.
For example, compare `<actual-backup>/src/availability.js` with
`src/availability.js`. Copy only the content you deliberately want to restore
after reviewing any changes made since application. Keep the backup until you
have verified the restored behavior. There is no automatic restore command
that could silently overwrite subsequent edits.

For a completely fresh attempt, use [rehearsal](rehearsal.md), not reverse-copying
all solution files and not `git reset`. Browser **Reset demo data** cannot undo
these source replacements.
