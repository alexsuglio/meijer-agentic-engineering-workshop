# FreshCart business rules

These rules are the workshop's testable contract. The store, products and order
are fictional. Tags and allergen fields are synthetic metadata, not medical
assurances. No real order, payment or inventory backend is involved.

## Existing shared behavior

`data/products.js` exports exactly 24 unique SKUs and the seed state.
`src/stock.js` is correct before any lab:

```text
available = max(0, onHand - reserved)
```

Stock values and monetary values are non-negative safe integers. Price values
are cents; format dollars only at display boundaries. Invalid domain numbers
must throw an explicit error; UI actions show errors without pretending success.

The basket stores one line per SKU. Quantity changes do not mutate inventory or
make reservations. This is a price-check basket, not a checkout. The pickup order
is another independent demo view; replacing its SKU does not subtract stock.
No sales tax, promotion stacking, cross-SKU BOGO, unit conversion or payment
processing is in scope.

## Lab 1: availability presentation

Target: `src/availability.js`. Keep the existing object shape
`{ available, status, label }` and `matchesAvailability(product, filter)`.

| Condition, in this order | status | label |
|---|---|---|
| available = 0 | `out` | Out of stock |
| 0 < available <= reorderThreshold | `low` | Low stock |
| available > reorderThreshold | `in` | In stock |

Zero takes precedence even when the threshold is zero. The threshold is
inclusive. Example: onHand 10, reserved 8, threshold 3 means 2 available and low
stock. Reserved greater than onHand clamps to zero, not a negative label.

Filter values are `all`, `attention`, `in`, `low`, `out`. `all` preserves every
product. `attention` (the "Needs attention" option) includes both `low` and `out`
and excludes `in`. Every filter uses the same classification as badges. Search and
department filters combine with availability using AND, not OR.
Starter badges are intentionally `unclassified`; do not change the shared stock
helper to manufacture a result.

## Lab 2: BOGO arithmetic

Target: `src/pricing.js`. For a BOGO line:

```text
charged units = ceil(quantity / 2)
line total cents = charged units * priceCents
```

For standard lines, charge every unit. Three units at 349 cents must be 698 cents,
not 349 and not 1047. Quantities 0,1,2,3,4,5 cost 0,349,349,698,698,1047 cents.
Two different BOGO SKUs with one unit each cost 698 cents together; they do not
form a free pair. Reject negative, fractional, string, non-finite and unsafe
numeric inputs; reject unknown promotions, unknown SKUs, duplicate basket SKU
lines and totals outside safe integer range.

The intentional starter defect uses floor for quantities above one, leaving
odd unpaired units free. Existing tests cover standard and even quantities but
not that defect. Add or inspect the regression before changing arithmetic.

## Lab 3: deterministic substitutions and visible action

Targets: `src/substitutions.js` AND `public/substitution-panel.js`.
`suggestSubstitutions(original, products, request)` is pure: do not mutate
inputs, inventory, basket or order. Do not call AI or external APIs from the app.
The request has a positive integer `quantity`, `requiredTags` string array and
`excludedAllergens` string array.

A candidate must pass EVERY gate:

- Different SKU from the original.
- Same category, exact numeric package size and exact package unit. No inferred
  equivalents: 1000 ml and 1 l are not the same package in this exercise.
- `availableQuantity(candidate) >= request.quantity`.
- Every required tag present, and none of the excluded allergens present.
- Known valid SKU/name/category/package/price/stock/tags/allergens metadata.
  Null, missing or malformed metadata rejects; an explicit empty array means
  known-empty, not unknown. Unknown original metadata gives a clear no-match.
- List price at most 120% of ORIGINAL list price, independent of BOGO or Lab 2.
  Compare `candidateCents * 100 <= originalCents * 120` using exact integer
  arithmetic (BigInt avoids multiplication overflow). At original 349 cents,
  418 passes and 419 fails. At original 100, 120 passes and 121 fails.

Rank passing candidates by absolute price difference from original, ascending,
then by SKU using deterministic lexical order. Take at most three. Do not depend
on input order, locale, prior lab completion, current order replacement price,
or current basket contents.

Return `{ status, candidates, message }`. Status is `matches` or `no-match`.
Each candidate contains `sku`, `name`, `priceCents`, `available` and five
`reasons`: category/package, available/requested quantity, required tags,
excluded allergens, and price cap/delta. No-match returns an empty array and a
message explaining that no item was changed. Malformed requests and duplicate
catalog SKUs throw explicit errors. The starter has a separate
`not-implemented` status so missing logic is not mistaken for a valid no-match.

For the seed, the expected top three are OAT-003 (0-cent delta), OAT-002 (20),
OAT-004 (30). OAT-005 is eligible but fourth. Soy, almond and dairy examples fail
metadata gates; OAT-006 exceeds the cap; OAT-007 has a different package.

The UI must render explanations and a labeled Replace button per candidate.
Showing suggestions does not alter the order. A click calls the existing
replacement callback, which updates local state, shows feedback and persists.
No-match clears stale candidate buttons. Keep manual replacement functional:
it checks stock only and explicitly tells the operator to review metadata.
The order always retains `originalSku` for future comparison.
