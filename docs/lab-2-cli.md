# Lab 2 - pricing regression in Copilot CLI

**Allocation:** 5 minutes frame / 10 demonstration / 15 practice.
**Target:** `src/pricing.js`. **Core check:** `npm run test:lab2` /
`pnpm run test:lab2`. Prior Lab 1 completion is not required.

## 1. Enter the correct local CLI session

Keep the app server running. In a second terminal at your clone root run
`git status --short`, then `copilot`. Complete sign-in if requested.
Inside Copilot, `/skills list` should list the repository skills. If you just
added customization files, use `/skills reload`; `/skills info pricing-regression`
shows the skill details. These are Copilot commands, not shell commands.

Paste at the Copilot prompt:

```text
Read README.md, docs/business-rules.md and .github/skills/pricing-regression/SKILL.md.
Do not edit yet. Report this checkout path and the Lab 2 scope. Preserve
my existing Lab 1 changes and do not use solutions/ or cloud delegation.
```

**Checkpoint:** the CLI reports the same checkout printed by the server and
recognizes the pricing-regression skill. If discovery fails, reading its exact
path is a transparent fallback, not proof of automatic discovery.

## 2. Reproduce the odd-quantity bug

In the browser's basket set Crunchy granola to quantity **3** and leave the field.
On the starter it incorrectly remains $3.49. Expected is $6.98.
In a normal shell (exit CLI with Ctrl+C if needed, then reopen later) run
`npm run test:lab2` or `pnpm run test:lab2`.

Paste into Copilot:

```text
Use the pricing-regression skill to reproduce the 3 x 349-cent BOGO defect.
Read actual test output and compare q=0,1,2,3,4,5. Explain which missing
regression let the baseline stay green. Do not fix code or alter assertions yet.
```

**Checkpoint:** the odd-quantity assertion fails for the business reason. Even
pairs work. Do not mistake the intentional failure for a broken install.

## 3. Fix the arithmetic, not the evidence

Paste into Copilot:

```text
Fix only the BOGO odd-quantity bug in src/pricing.js. Charge ceil(q/2) units
within each SKU, so q3 at349 totals698 cents. Preserve standard pricing,
q0/q1 behavior, integer validation, overflow errors and one line per SKU.
Do not mix SKU pairs. Run baseline and Lab 2 acceptance checks. Do not edit
other labs, copy solutions, commit, push or call /delegate.
```

Review requests for execution or file edits; do not grant unrelated access.
Ask the agent to stop if it changes prices or edits expected totals to hide the bug.

**Checkpoint:** the diff fixes charged units while keeping existing validation
and basket behavior. Baseline and pricing acceptance checks report success.

## 4. Review the actual diff with a custom agent

Inside Copilot use `/agent` and choose **grocery-rules-reviewer**. If the picker
is unavailable in your build, read the profile and use the same prompt without
claiming the custom agent was selected.

Paste:

```text
Audit my current Lab 2 diff using docs/business-rules.md. Do not edit.
Run the relevant existing checks. Report a table with file, rule, expected,
actual evidence and pass/fail for odd quantities, separate SKUs, invalid
inputs and standard pricing. Preserve all unrelated local changes.
```

In a shell independently run:

```sh
npm test
npm run test:lab2
git diff -- src/pricing.js acceptance/pricing.test.js
```

pnpm equivalents: `pnpm test` and `pnpm run test:lab2`.
Refresh the browser and set granola quantities 1,2,3,4,5; expect
$3.49, $3.49, $6.98, $6.98, $10.47. Add one bagel and use quantity 1 for each
of bagel and granola: together these different SKUs cost $6.98.

**Checkpoint:** file evidence, tests and visible totals agree. The custom agent's
execute permission can run mutating commands; its no-edit instruction is a
policy, not a technical sandbox.

## 5. Close the CLI handoff

Paste:

```text
Summarize the pricing defect, smallest fix, actual checks and remaining
unverified behavior. Confirm no other lab was altered and no remote action
was taken. Stop editing so I can open this same clone in the desktop app.
```

Exit the CLI with Ctrl+C when it is idle. Keep the separate HTTP server running.
Use `git status --short` to inspect the local changes.

**Checkpoint:** the CLI is no longer modifying files and the same local clone
is ready for [Lab 3](lab-3-app.md). A presenter may demonstrate `/delegate`
separately using [the owner-only guide](presenter-cloud-demo.md); participants
do not need remote-write permissions.

## Optional stretch - receipt savings

Paste:

```text
Add a receipt savings display: standard list total minus charged total,
in integer cents. Keep the pricing function's return contract unchanged.
Test q3 at349 has349 cents savings and two different single-unit SKUs have0.
Do not change promotion policy or add a payment flow.
```

**Stretch checkpoint:** savings explain the price without changing it. Review
the extra UI/tests independently. Use [solutions](solutions.md) if stuck.
