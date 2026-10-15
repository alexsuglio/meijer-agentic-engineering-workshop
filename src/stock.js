export function availableQuantity(product) {
  for (const key of ['onHand', 'reserved']) {
    if (!Number.isSafeInteger(product?.[key]) || product[key] < 0) {
      throw new TypeError(`${key} must be a non-negative safe integer`);
    }
  }
  return Math.max(0, product.onHand - product.reserved);
}
