import { initialState } from '../data/products.js';
import { availableQuantity } from './stock.js';

export const storageKey = 'freshcart-ops-v1';
export const freshState = () => structuredClone(initialState);

export function validateState(state, products) {
  if (!state || !Array.isArray(state.basket) || !state.order) throw new TypeError('Invalid saved workshop data');
  const seen = new Set();
  for (const line of state.basket) {
    const product = products.find(product => product.sku === line?.sku);
    if (!product || seen.has(line.sku) || !Number.isSafeInteger(line.quantity) || line.quantity < 1 || line.quantity > availableQuantity(product)) {
      throw new TypeError('Invalid saved basket; use Reset demo data');
    }
    seen.add(line.sku);
  }
  const expected = initialState.order;
  const order = state.order;
  if (!products.some(product => product.sku === order.sku) ||
      order.originalSku !== expected.originalSku || order.id !== expected.id || order.quantity !== expected.quantity ||
      JSON.stringify(order.requiredTags) !== JSON.stringify(expected.requiredTags) ||
      JSON.stringify(order.excludedAllergens) !== JSON.stringify(expected.excludedAllergens)) {
    throw new TypeError('Invalid saved order; use Reset demo data');
  }
  return state;
}
