# Troubleshooting

Capture the exact command, checkout path, expected result and actual error.
Do not solve access problems by bypassing warnings or granting broad permissions
without an explicit user decision.

| Symptom | Likely cause and concrete next action |
|---|---|
| `node` not found | Install Node 24 through approved tooling, reopen the terminal, run `node --version`. Do not run random downloaded shell scripts. |
| `setup:check` rejects Node | It deliberately targets major24. Use an existing version manager or approved Node24 install for this clone. Record the actual runtime; don't falsify the preflight. |
| npm-only user sees missing pnpm | This project's preflight should not ask for it. Use `npm run setup:check`, inspect the actual script/checkout, and remove no code blindly. Only pnpm users need pnpm10. |
| pnpm reports lockfile mismatch | Confirm pnpm10 and the tagged starter. The checked-in lock was generated with pnpm10.34.6; ask the maintainer to investigate drift instead of improvising dependency versions during a lab. |
| npm ci says lockfile incompatible | Confirm repository root and Node/npm versions. The lock was generated with npm11.11.0 on Node24.14.1. Check for local manifest/lock edits; have the maintainer investigate rather than deleting the lock. |
| Registry/proxy/certificate failure | Use your organization's approved proxy/certificate configuration. Never set `strict-ssl=false`, `NODE_TLS_REJECT_UNAUTHORIZED=0`, or ignore a browser warning. |
| `EADDRINUSE` on port3000 | Stop the previous server with Ctrl+C in its own terminal. Do not kill every node process. Compare printed checkout paths before restarting. |
| Need another port | POSIX shell: `PORT=3001 npm start` or `PORT=3001 pnpm start`. PowerShell: `$env:PORT='3001'; npm start` (or pnpm). Open `http://127.0.0.1:3001`. It has separate browser storage. |
| `file://` page or module/CORS error | Start `npm start` / `pnpm start` and use the HTTP URL. Do not open index.html directly or disable browser security. |
| UI unchanged after agent edits | Refresh; compare server's printed absolute path with editor and desktop session. Stop old server before changing checkout. Verify the session is local-repository mode, not another worktree. |
| Red saved-data error | Corrupt JSON, old state shape or blocked localStorage. The UI shows a seed preview and refuses editing until Reset demo data. Confirm reset; if storage itself is blocked, allow storage for this local origin through normal browser settings. |
| Basket rejects a quantity | It must be a whole number from0 to available stock. Reserved units do not count. An empty input, fractional value or stock overrun should show an error rather than save. |
| Granola quantity3 totals $3.49 | Expected starter defect for Lab2. It should be $6.98 after the pricing fix. Run the Lab2 acceptance suite. |
| All badges say Not classified | Expected Lab1 starter. Do not "fix" the seed or shared stock helper. |
| Low-stock filter is empty | Expected before Lab1. After Lab1, clear search and choose All departments; expect BAN-001, SPIN-001, BERRY-001. |
| Suggestions say not implemented | Expected Lab3 starter. Implement both helper and UI; don't substitute a no-match message to hide unfinished logic. |
| Helper tests pass but no Replace buttons | Inspect `public/substitution-panel.js` and its callback in app.js. Lab3 is incomplete until buttons/explanations/no-match work. |
| No suitable replacements after a change | Inspect hard metadata gates and originalSku. Unknown tags/allergens reject. Do not relax rules to force a result. |
| Baseline tests fail on starter | Not an intended exercise. Capture output, check versions/checkout and ask the facilitator. Don't start solving random failures. |
| Unselected acceptance tests fail | Intentional until those labs are implemented. Baseline tests and the selected lab should pass. |
| `ERR_MODULE_NOT_FOUND` or SyntaxError in acceptance | Setup/code issue, not the intended failing assertion. Check file paths/imports and restore only the intended reference files if you choose recovery. |
| Custom agent or skill is missing | Check local repo path and `.github` files, use `/skills reload` then `/skills list`; reopen the session if needed. Read the file explicitly as a disclosed fallback. |
| VS Code Agent/Allow controls differ | In the chat input select Agent from the agent picker, then expand a requested tool call and select Allow. If your version differs, consult the current official VS Code tools guide and record the installed version; do not approve an unrelated action or claim the old click path was verified. |
| Slash command errors in the terminal | `/agent`, `/skills list`, `/delegate` and `/login` belong inside Copilot. Start it with the shell command `copilot` first. |
| Copilot cannot read/edit/run commands | Authentication, enterprise policy, workspace trust and tool approvals are separate. Inspect the exact denied tool. Manual approval is the default; ask a present user/administrator for the necessary grant. |
| Autopilot still cannot write files | Execution mode is not blanket tool permission. `/autopilot` differs from `/allow-all-tools` or `/yolo`. Do not enable broad auto-approval to bypass denial; only the user may consciously choose it for trusted code. |
| Tool says no one could approve | Stop the denied action and report the exact limitation. Do not switch tools, shell encodings, checkouts or clients to bypass it. Work may need to remain an unexecuted document. |
| Remote push/PR permission denied | Participants do not need either. Continue local labs. Only the owner/presenter uses a separately authorized writable repo for cloud demo. |
| `/delegate` unavailable | Check presenter entitlement, policy, repo ownership/write access and supported host. Do not impersonate another account or modify permissions during the workshop. Use a clearly labeled walkthrough instead. |
| Solution application refuses no TTY | Preview, inspect target files, then explicitly choose an interactive confirmation or `--apply --yes`. Do not add --yes automatically. |
| Solution application says unsafe path/symlink | Leave the refusal intact. Inspect the fixed manifest against the reference and use a fresh trusted clone. Do not loosen path guards. |
| Files changed since preview | Stop the other editor/agent, inspect changes, and create a new preview. The tool must not overwrite unseen edits. |
| Apply stops after replacing one file | Read the error's list and backup path. Compare backed-up originals with current files and restore deliberately in an editor. No atomic multi-file guarantee is claimed. |
| Reset demo data didn't undo the fix | Correct: it resets localStorage, not code. Use a fresh clone/practice branch from `workshop-v1`; keep prior work. |
| Print reference uses two pages | Select A4 or Letter portrait, 100% scale, headers/footers off and normal printer margins. Check actual preview; if still two pages, the maintainer must correct layout before release rather than assert one-page success. |

## Transparent fallback when a Copilot surface is unavailable

Pair with someone who has access or observe the presenter, then perform the same
local code/test exercise manually or through another available client. Record
that the required surface was not verified; do not claim three-surface success.
No cloud or paid application API is needed to run the grocery app.
