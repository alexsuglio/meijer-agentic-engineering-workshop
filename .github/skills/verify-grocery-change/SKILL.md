---
name: verify-grocery-change
description: Verify a bounded FreshCart change with business-rule evidence, the actual diff, targeted tests and honest UI status.
---

# Grocery verification workflow

Read docs/business-rules.md and the user's requested lab. Inspect git status,
git diff and git diff --cached; include new files explicitly. If workshop-v1
exists and the user asks for a full practice-branch review, compare that baseline
too. Do not silently include unrelated changes or assume a clean worktree.

Map touched behavior to checks:

| Changed behavior | Required command after npm test / pnpm test |
|---|---|
| Availability or catalog stock filter | npm run test:lab1 / pnpm run test:lab1 |
| Price arithmetic or basket totals | npm run test:lab2 / pnpm run test:lab2 |
| Suggestion helper, renderer or replacement wiring | npm run test:lab3 / pnpm run test:lab3 |
| Recovery tooling | node --test test/recovery.test.js |
| Server routing | node --test test/server.test.js |

Read the command definitions before execution. Test commands execute repository
code and are not inherently read-only. Respect the user's tool permissions.
If blocked, report the exact command and limitation; do not try another tool to
bypass the denial. Do not install dependencies without an actual need/approval.

Review integer cents, reservation-aware stock, unknown metadata, error surfaces,
explicit replacement and preservation of unrelated labs. Tests for unfinished
unselected labs may intentionally fail; never label them fixed without evidence.

For UI changes separately inspect the running server's absolute checkout path,
the browser URL, refresh behavior, keyboard focus, feedback/errors, and 390px /
desktop layouts. Record which observations were actually made. A DOM fixture is
not a browser. Reset data is not source replay.

Return a table: file/rule, expected, actual evidence, pass/fail/blocked.
Include commands with real outcomes and line-specific findings. Do not edit
during a review-only request; do not commit, push, create PRs or merge.
