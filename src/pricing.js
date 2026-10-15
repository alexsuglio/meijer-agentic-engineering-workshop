import { requireCents } from './money.js';

export function lineTotal(product, quantity) {
  requireCents(product?.priceCents);
  if (!Number.isSafeInteger(quantity) || quantity < 0) throw new TypeError('quantity must be a non-negative safe integer');
  if (![null, 'BOGO'].includes(product.promotion)) throw new TypeError('Unknown promotion');
  // Lab 2: even pairs work, but the unpaired unit is accidentally made free.
  const charged = product.promotion === 'BOGO' && quantity > 1 ? Math.floor(quantity / 2) : quantity;
  const total = charged * product.priceCents;
  requireCents(total, 'line total');
  return total;
}

export function basketTotal(lines, products) {
  let total = 0;
  const seen = new Set();
  for (const line of lines) {
    if (seen.has(line.sku)) throw new TypeError('Basket must contain one line per SKU');
    seen.add(line.sku);
    const product = products.find(item => item.sku === line.sku);
    if (!product) throw new TypeError(`Unknown SKU: ${line.sku}`);
    total += lineTotal(product, line.quantity);
    requireCents(total, 'basket total');
  }
  return total;
}
