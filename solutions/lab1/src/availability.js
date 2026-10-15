import { availableQuantity } from './stock.js';

export function availability(product) {
  const available = availableQuantity(product);
  if (!Number.isSafeInteger(product.reorderThreshold) || product.reorderThreshold < 0) {
    throw new TypeError('reorderThreshold must be a non-negative safe integer');
  }
  if (available === 0) return { available, status: 'out', label: 'Out of stock' };
  if (available <= product.reorderThreshold) return { available, status: 'low', label: 'Low stock' };
  return { available, status: 'in', label: 'In stock' };
}

export function matchesAvailability(product, filter) {
  if (!['all', 'attention', 'in', 'low', 'out'].includes(filter)) throw new TypeError('Unknown availability filter');
  if (filter === 'all') return true;
  const status = availability(product).status;
  return filter === 'attention' ? status === 'low' || status === 'out' : status === filter;
}
