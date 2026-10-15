# Lab 1 - stock clarity in VS Code

**Allocation:** 5 minutes frame / 10 demonstration / 15 practice.
**Target:** `src/availability.js`. Existing UI wiring is in `public/app.js`.
**Core check:** `npm run test:lab1` or `pnpm run test:lab1`.

## 1. Observe before requesting an edit

In VS Code choose **File > Open Folder**, select your practice clone, open
`src/availability.js`, and open the Chat view. In the chat input, select **Agent**
from the agent picker. Expand each requested tool call and select **Allow**
only for the local action you approve. If controls differ, use the version-drift
note in [troubleshooting](troubleshooting.md). In the browser, search `BAN-001`, observe
2 available / 10 on hand / 8 reserved, then select **Low stock**.

Paste into VS Code Chat:

```text
Read docs/business-rules.md and trace src/stock.js, src/availability.js and
the catalog callers in public/app.js. Do not edit yet. Explain why BAN-001
has 2 available but is not classified, and identify the smallest Lab 1 change.
Do not read or copy solutions/. Do not touch pricing or substitutions.
```

**Checkpoint:** the answer identifies the unfinished classifier, not a stock
arithmetic problem. Low-stock filtering is empty on the starter.

## 2. Turn the rules into failing evidence

Open `acceptance/availability.test.js`. In VS Code's integrated terminal run:

```sh
npm run test:lab1
```

pnpm equivalent: `pnpm run test:lab1`.

Paste into Chat:

```text
Review the Lab 1 acceptance tests against the business rules. Explain the
failure for onHand=10, reserved=8, reorderThreshold=3. Confirm that tests
cover zero precedence, clamping, an inclusive threshold, filter parity, and
Needs attention including both low-stock and out-of-stock products.
Do not weaken assertions or edit production code in this step.
```

**Checkpoint:** failures point to `unclassified` versus expected stock labels.
They must be assertion failures, not missing modules or syntax errors.

## 3. Implement the bounded behavior

Paste into Chat:

```text
Implement Lab 1 in src/availability.js. Use the existing availableQuantity
helper. Return out/Out of stock at zero first, low/Low stock for positive
availability <= reorderThreshold, otherwise in/In stock. Keep the existing
object shape and filter API, including attention matching low OR out.
Preserve invalid-input errors, search and
department filtering. Change no other lab. Run the baseline and Lab 1 tests.
Do not commit, push, publish, create a PR or apply a reference solution.
```

Inspect the agent's proposed tool actions and allow only the needed local
edits/checks. In Source Control, select the changed file to inspect the diff.

**Checkpoint:** only Lab 1 implementation and any directly related test changes
appear. No seed stock, pricing, substitution or reference solution file changed.

## 4. Verify in the terminal and browser

Run:

```sh
npm test
npm run test:lab1
git diff -- src/availability.js acceptance/availability.test.js
```

pnpm equivalents: `pnpm test` and `pnpm run test:lab1`; Git is unchanged.
Refresh the browser, clear search, choose **All departments**, then **Low stock**:
expect BAN-001, SPIN-001 and BERRY-001. Choose **Out of stock**: expect OAT-001 and
AVO-001. Choose **Needs attention**: expect all five of those products and none
of the 19 in-stock products. Return to **All stock**, choose Produce, and search `banana`.

Paste into Chat:

```text
Review my actual Lab 1 diff. Report expected versus actual for reservation
math, zero precedence, inclusive threshold, and badge/filter agreement.
Include the commands and their actual exit results; do not infer browser
success from unit tests. Do not edit anything.
```

**Checkpoint:** baseline and Lab 1 pass, browser labels/filter agree, and the
search/department combination still yields Banana bunch. Other labs remain
unfinished without blocking this result.

## 5. Capture the result and hand off

Run `git status --short`. Record your changed paths and one before/after example.
Leave code in your local practice branch; no commit is required.

Paste into Chat:

```text
Summarize Lab 1 in four facts: defect, rule implemented, changed paths,
and observed evidence. Clearly separate tests you ran from browser behavior
I reported. Leave the repository untouched and identify the next lab file.
```

**Checkpoint:** you can explain why 10 on hand is not 10 sellable units. The
next lab is `src/pricing.js`; stop VS Code's agent activity before switching.

## Optional stretch - replenishment summary

Only after the core check passes, paste:

```text
Add a small replenishment summary using the same availability classifier.
Order out-of-stock before low-stock, then SKU for ties. Show available units
and threshold; keep normal catalog ordering unchanged. Add a focused test.
Do not change any other lab or add dependencies.
```

**Stretch checkpoint:** the summary and badges cannot disagree. Review the
additional UI diff separately. See [solutions](solutions.md) for recovery, and
[Lab 2](lab-2-cli.md) for the next surface.
