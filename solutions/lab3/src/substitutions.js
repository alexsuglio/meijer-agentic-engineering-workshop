import { availableQuantity } from './stock.js';

const text = value => typeof value === 'string' && value.length > 0;
const strings = value => Array.isArray(value) && value.every(text);
const nonnegative = value => Number.isSafeInteger(value) && value >= 0;
const known = product => product && text(product.sku) && text(product.name) &&
  text(product.category) && text(product.packageUnit) &&
  Number.isSafeInteger(product.packageSize) && product.packageSize > 0 &&
  nonnegative(product.priceCents) && nonnegative(product.onHand) &&
  nonnegative(product.reserved) && strings(product.tags) && strings(product.allergens);

const noMatch = message => ({ status: 'no-match', candidates: [], message });

export function suggestSubstitutions(original, products, request) {
  if (!original || !Array.isArray(products) || !request ||
      !Number.isSafeInteger(request.quantity) || request.quantity < 1 ||
      !strings(request.requiredTags) || !strings(request.excludedAllergens)) {
    throw new TypeError('A product, catalog, positive integer quantity, requiredTags and excludedAllergens arrays are required');
  }
  if (!known(original)) return noMatch('No suitable replacements: original product metadata is incomplete.');
  const seen = new Set();
  for (const product of products) {
    if (text(product?.sku)) {
      if (seen.has(product.sku)) throw new TypeError(`Duplicate catalog SKU: ${product.sku}`);
      seen.add(product.sku);
    }
  }
  const eligible = products.filter(candidate =>
    known(candidate) &&
    candidate.sku !== original.sku &&
    candidate.category === original.category &&
    candidate.packageSize === original.packageSize &&
    candidate.packageUnit === original.packageUnit &&
    availableQuantity(candidate) >= request.quantity &&
    request.requiredTags.every(tag => candidate.tags.includes(tag)) &&
    request.excludedAllergens.every(allergen => !candidate.allergens.includes(allergen)) &&
    BigInt(candidate.priceCents) * 100n <= BigInt(original.priceCents) * 120n);
  eligible.sort((a, b) =>
    Math.abs(a.priceCents - original.priceCents) - Math.abs(b.priceCents - original.priceCents) ||
    (a.sku < b.sku ? -1 : a.sku > b.sku ? 1 : 0));
  const candidates = eligible.slice(0, 3).map(candidate => ({
    sku: candidate.sku,
    name: candidate.name,
    priceCents: candidate.priceCents,
    available: availableQuantity(candidate),
    reasons: [
      `Same ${original.category} category and ${original.packageSize} ${original.packageUnit} package.`,
      `${availableQuantity(candidate)} available; ${request.quantity} requested.`,
      `Required tags satisfied: ${request.requiredTags.join(', ') || 'none requested'}.`,
      `Excluded allergens absent: ${request.excludedAllergens.join(', ') || 'none requested'}.`,
      `Within 120% list-price cap; absolute price delta ${Math.abs(candidate.priceCents - original.priceCents)} cents.`
    ]
  }));
  if (!candidates.length) return noMatch('No suitable replacements meet every rule. Review the order manually; no item was changed.');
  return { status: 'matches', candidates, message: `${candidates.length} suitable replacements. Choose Replace to change the order; nothing changes automatically.` };
}
