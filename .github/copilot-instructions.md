# FreshCart Ops repository instructions

This repository is a local workshop starter, not a production grocery system.
Read docs/business-rules.md before making domain changes. Use synthetic data only.
Keep JavaScript ESM, the Node built-in server/test runner, integer cents and
dependency-free browser code. Do not add frameworks, databases, external APIs,
secrets, authentication or a build pipeline for a workshop lab.

Main and workshop-v1 must remain unfinished. Only implement the lab the user
requests in their local practice clone. Never solve all labs as a cleanup task.
Do not inspect or copy solutions/ unless the user explicitly chooses reference
recovery. Do not change reference solutions to hide an acceptance failure.

Lab 1 owns src/availability.js and existing catalog wiring. Lab 2 owns
src/pricing.js. Lab 3 owns src/substitutions.js and
public/substitution-panel.js; it requires both helper and usable UI.
src/stock.js is already correct and shared. Preserve other local lab changes.

Use max(0, onHand-reserved), with zero precedence and inclusive reorder threshold.
BOGO never mixes SKUs and charges ceil(quantity/2). Substitutions must satisfy all
hard metadata/package/stock/price rules, rank deterministically, and require an
explicit replacement click. Do not describe synthetic tags as dietary safety.

Before editing, inspect the actual files/diff and identify the expected failing
case. Run npm test (or pnpm test) plus the selected test:labN script afterward.
Baseline tests intentionally omit unfinished features. Do not make all
acceptance tests pass unless the user explicitly requests every lab.
Preserve API shapes and invalid-input errors. Never report a check as passing
unless it actually ran. Browser observations are separate from unit tests.

Show explicit UI errors and feedback. Do not use innerHTML for product data.
Keep accessible labels, keyboard operation, responsive layout and storage reset.
Reset demo data resets browser data, not source. Use fresh clones/practice
branches for replay; never discard the user's work.

Participants have read-only remotes but editable local clones. Do not push, open
issues/PRs, use /delegate, change permissions, or start cloud work unless the user
explicitly requests a presenter-only remote action. Do not commit unless asked.
Do not enable auto-merge or Agent merge. Keep the presenter's cloud PR unmerged.

Use only the current checkout. Check the server's printed path against the
agent's checkout before claiming a UI change works. Do not silently switch to a
different worktree. Respect tool denials; do not bypass them through alternate
shell commands, clients or broad auto-approval.
