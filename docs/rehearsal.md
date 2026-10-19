# Rehearse without permanently fixing the app

The starter must remain unfinished on main and at `workshop-v1`. Practice work
belongs in your clone and local practice branch. Remote read-only access still
allows local edits. A presenter cloning their own writable repository keeps
owner permissions; cloning does not turn ownership into read-only access.

## Recommended: another fresh clone

Stop the current HTTP server with **Ctrl+C in the terminal that started it**.
Stop any active Copilot edit session. Keep the entire old clone and its changes.
From a parent directory, choose a new destination name that does not exist:
Use the public URL below, or substitute your facilitator's internal distribution
URL.

```sh
git clone --branch workshop-v1 --single-branch https://github.com/alexsuglio/agentic-engineering-workshop-dev-days.git freshcart-round-2
cd freshcart-round-2
git switch -c practice/round-2
npm ci
npm run setup:check
npm test
npm start
```

pnpm replaces the last four commands with:

```sh
pnpm install --frozen-lockfile
pnpm run setup:check
pnpm test
pnpm start
```

This selects the tagged starter, not whichever feature a branch currently holds.
If the tag is unavailable, ask the maintainer for the verified starter commit;
do not silently use a fixed main branch. If the destination already exists,
choose a new name rather than deleting it.

The new server prints its absolute path. Open that exact folder in VS Code,
Copilot CLI and the desktop app's local-repository session. Do not let the app
silently create another worktree. Refresh `http://127.0.0.1:3000`.
Because browser storage is scoped to origin rather than filesystem checkout,
the previous basket may still appear. Click **Reset demo data** and confirm.

**Replay checkpoint:** badges say Not classified; granola quantity3 incorrectly
shows $3.49; automatic suggestions say not implemented. Baseline tests should
pass while all three acceptance suites expose their starter gaps.

## Alternative: new local branch in an existing clean clone

First stop the server and active agents. Inspect:

```sh
git status --short
git diff
git diff --cached
```

If anything is uncommitted, prefer the fresh-clone method above. Do not reset,
stash, delete or force-checkout your work. If YOU deliberately want to preserve
your work as a local commit, review and stage only desired changes with
`git add -p`, review `git diff --cached`, then run
`git commit -m "Save local workshop practice"`. This is an optional explicit
human action, not something the workshop agent should do automatically.

Only after the working tree is clean, create a NEW local branch from the tag:

```sh
git switch -c practice/round-3 workshop-v1
npm test
npm start
```

pnpm: `pnpm test` and `pnpm start`. Do not reuse an existing branch name; choose
another. Your saved practice commit remains on its previous branch. Again compare
server path, editor path and app session path, and reset only browser data.

## Independent lab rehearsal

You can practice Lab 2 or Lab 3 on the untouched starter without Lab 1. To practice
a completed surrounding context, explicitly preview/apply only the other labs
using [solutions](solutions.md). Never make the active starter main the
all-solutions version. Keep main and the starter tag unchanged.

## Presenter rehearsal

Use a separate clean clone of the presenter's own writable GitHub repository for
the optional [cloud pricing demo](presenter-cloud-demo.md). A separate clone is
recommended to avoid checkpointing unrelated local edits, not because ordinary
cloning removes owner permissions. Keep the cloud PR unmerged and leave
auto-merge/Agent merge disabled. A failed or unavailable cloud demonstration
does not prevent any participant's local lab.
