# Lab 3 - explained substitutions in the desktop app

**Allocation:** 5 minutes frame / 10 demonstration / 15 practice.
**Targets:** `src/substitutions.js` and `public/substitution-panel.js`.
**Core check:** `npm run test:lab3` / `pnpm run test:lab3`.
Neither other lab is a prerequisite; this uses shared stock and original list price.

## 1. Select the same local repository

Open the GitHub Copilot desktop app. In the sidebar, next to **Projects**, click
**+** to start a session and choose the folder for this existing local clone.
In the dropdown under the prompt box, choose **your local repository**, not a
new working tree or cloud sandbox. In the mode dropdown below the prompt field,
choose **Plan** for inspection.
Compare the session's displayed path with the absolute path printed by the
running server. If they differ, stop before editing.

Paste:

```text
Read docs/business-rules.md, src/substitutions.js, public/substitution-panel.js,
src/order.js and their callers in public/app.js. Report this session's exact
checkout path and a bounded Lab 3 implementation plan. Do not edit, create
a different worktree, change other labs, commit, push or start cloud work.
```

**Checkpoint:** the app is examining the same files your browser serves. The
plan names both the helper and renderer, not just a function returning an array.
Control labels can change between app builds; the facilitator must rehearse the
[documented session workflow](product-sources.md) for the installed version.

## 2. Inspect the unavailable order and hard rules

In the browser click **Reset demo data**, confirm, then
**Find suitable replacements**. Expect an explicit not-implemented message.
Expand **Choose a replacement manually**, select Harvest oat drink, and click
**Replace selected item**. Confirm the displayed SKU changes, then reset again.

Paste into the app:

```text
Use .github/skills/substitution-check/SKILL.md to enumerate the hard gates for
OAT-001, quantity2, vegan and gluten-free, excluding milk/soy/tree-nuts.
Explain why OAT-003, OAT-002 and OAT-004 should rank first, and why soy, almond,
whole milk, reserve oat and travel oat fail. No code changes yet.
```

**Checkpoint:** manual replacement is already real; automatic suggestions are
missing. Unknown metadata is not treated as proof of a safe match.

## 3. Implement a complete, bounded vertical slice

Review the plan and use the mode dropdown below the prompt field to choose
**Interactive**, allowing the
necessary local edits/checks. Paste:

```text
Implement Lab 3's pure deterministic helper AND its wired candidate UI.
Require different SKU, exact category/package size/unit, available quantity
>= requested quantity, every required tag, no excluded allergen and known
metadata. Cap list price at120% of original using integer arithmetic.
Rank absolute price delta then SKU; return max3 with rule explanations.
Render explicit Replace buttons through the existing callback and a clear
no-match state that clears stale buttons. Never replace automatically.
Keep manual replacement, originalSku, persistence and other labs unchanged.
Use the business rules and acceptance tests; do not read/copy solutions/.
Run baseline and Lab 3 tests. No commit, push, PR or cloud session.
```

**Checkpoint:** both target files change, and the agent explains how a button
click reaches `replaceOrderItem` and local persistence. Merely returning
candidates from the helper does not complete this lab.

## 4. Inspect evidence and interact with the result

Open the app's file-change/diff view and inspect both files. In a shell run:

```sh
npm test
npm run test:lab3
git diff -- src/substitutions.js public/substitution-panel.js
```

pnpm equivalents: `pnpm test` and `pnpm run test:lab3`.
Refresh the browser, reset demo data, and request suggestions. Expect OAT-003,
OAT-002, OAT-004 with explanations. Before clicking, order SKU remains OAT-001.
Click **Replace with Barista oat drink**; expect OAT-003 and visible confirmation.
Reload: the replacement should persist. Reset: OAT-001 returns.

Select **grocery-rules-reviewer** in the agent picker or through `/agent`, then paste:

```text
Audit the actual Lab 3 diff without editing. Use substitution-check and the
business rules. Execute baseline and Lab 3 checks. Show file/rule/expected/
actual/pass-fail evidence for unknown metadata, package identity, stock
equality, integer cap boundaries, tie order, max3, no-match and explicit UI
replacement. Do not equate a DOM fixture with a real-browser verification.
```

**Checkpoint:** helper tests, renderer callback tests and your browser
observations all support the result. The no-match automated test clears buttons
and displays a real no-match message; unknown metadata and price boundaries fail closed.

## 5. Record what is and is not proven

Run `git status --short`. In the app paste:

```text
Summarize this local change with actual modified files and check results.
Separate unit/DOM-fixture evidence from my real-browser observations.
List any remaining unverified behavior honestly. Do not create a PR or
merge anything. Explain how to replay from workshop-v1 without losing work.
```

**Checkpoint:** no remote changes occurred. You can replay the exercise using
[rehearsal](rehearsal.md); Reset demo data alone cannot restore unfinished code.

## Optional stretch - comparison panel

Paste:

```text
Add an original-versus-candidate comparison panel showing package, available
quantity, required tags/exclusions and cents delta. Reuse the same candidate
policy; do not introduce new ranking rules or auto-selection. Add a focused
rendering test and keep accessible labels.
```

**Stretch checkpoint:** comparison explains existing rules without relaxing a
hard gate. Continue to the [wrap-up](facilitator-guide.md) or use
[solutions](solutions.md) for a narrow recovery.
