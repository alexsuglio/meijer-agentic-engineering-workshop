export function requireCents(value, name = 'priceCents') {
  if (!Number.isSafeInteger(value) || value < 0) throw new TypeError(`${name} must be a non-negative safe integer`);
}

export function formatMoney(cents) {
  requireCents(cents, 'cents');
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}
