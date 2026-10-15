---
applyTo: "src/**/*.js,data/**/*.js"
---

Read docs/business-rules.md and reuse availableQuantity from src/stock.js.
Use non-negative safe integers for stock, quantities and cents; reject malformed
inputs explicitly. Use integer arithmetic for the 120% cap, including overflow
considerations. Keep formatting separate from calculations.

Do not mutate product metadata, seed objects or caller inputs in domain helpers.
Maintain one basket line per SKU; BOGO is not a basket-wide pairing algorithm.
Treat null/missing tags and allergens as unknown, not empty. Package identity is
exact; do not invent conversions or substitute categories.

Keep the chosen lab independent. Availability classification is not a dependency
for substitutions; use the stock helper. Substitution caps compare list prices,
not discounted totals. Preserve originalSku after a manual or suggested choice.
