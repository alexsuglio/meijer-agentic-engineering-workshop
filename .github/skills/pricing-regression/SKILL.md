---
name: pricing-regression
description: Reproduce and verify FreshCart integer-cent BOGO regressions without mixing SKUs or weakening existing behavior.
---

# Pricing regression workflow

Use this skill for a FreshCart pricing bug, especially odd BOGO quantities.
Read docs/business-rules.md, src/pricing.js, its basket callers and the actual
working/staged diff. Do not read solutions/ unless the user requests recovery.

Establish the before state. Run npm run test:lab2 (or pnpm run test:lab2) and
capture the failing assertion. If no odd-quantity regression exists, add one in
acceptance/pricing.test.js with the literal expectation 698 for 3 x 349 cents.
Do not derive expected values using the same formula as the code under test.

Check this evidence table:

| Rule | Inputs | Expected cents |
|---|---|---|
| Empty line | BOGO, q0, price349 | 0 |
| Single | BOGO, q1 | 349 |
| Pair | BOGO, q2 | 349 |
| Odd | BOGO, q3 | 698 |
| Two pairs | BOGO, q4 | 698 |
| Odd continuation | BOGO, q5 | 1047 |
| Standard | no promotion, q3 | 1047 |
| No SKU mixing | A q1 + B q1, both price349 BOGO | 698 |

Inspect negative/fractional/string/non-finite/unsafe quantities and prices,
unknown promotions/SKUs, duplicate lines and overflow. Preserve explicit errors.

If implementation is authorized, change only the charged-unit calculation and
directly related coverage. Preserve the return type, one-line-per-SKU model,
standard pricing and other lab files. Run npm test plus npm run test:lab2
(or pnpm equivalents), inspect git diff, and report actual results.

For browser evidence ask the operator to set granola to 3, refresh and confirm
$6.98. Do not claim to have seen it unless a browser was actually inspected.
Return defect, changed paths, before/after assertion, command/exit evidence,
visible-behavior evidence and remaining uncertainty. Do not commit or publish.
