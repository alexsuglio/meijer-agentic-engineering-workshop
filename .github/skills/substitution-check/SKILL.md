---
name: substitution-check
description: Check FreshCart substitution eligibility, deterministic ranking and explicit UI replacement against synthetic metadata rules.
---

# Substitution review and test workflow

Read docs/business-rules.md, data/products.js, src/substitutions.js,
public/substitution-panel.js, src/order.js and the relevant public/app.js callers.
Inspect the actual diff before drawing conclusions. Use the original order's
SKU and list price; current replacement and basket pricing are not the baseline.

Build one positive candidate and isolate each rejection:

- Original SKU, different category, different package size, different unit.
- Insufficient available stock including reservations; equality must pass.
- Missing required tag; each excluded allergen; unknown/null/malformed metadata.
- Price one cent beyond the integer cap; exact inclusive cap must pass.

For original349, price418 passes and419 fails. For original100, price120 passes
and121 fails. Exercise safe-integer extremes so multiplication cannot silently
round. Check empty requirements are known arrays, not unknown metadata.

Use equal-delta candidate prices with reversed input order to test the SKU tie
break. Assert max3 and meaningful reasons for category/package, stock, tags,
exclusions and price. Verify the seed order OAT-003, OAT-002, OAT-004.

Trace the UI from Find suitable replacements to rendered explanations and the
explicit Replace callback. Rendering must not mutate the order. Clicking must
update SKU, feedback and saved local state. A no-match response clears stale
buttons and explains that nothing changed. Preserve stock-only manual choice
with its warning.

Run npm test and npm run test:lab3, or pnpm equivalents. Report helper test,
renderer fixture and actual browser evidence separately. If implementation is
requested, change both relevant surfaces and rerun checks; if review-only, do not
edit. Never claim these synthetic labels establish real dietary safety.
