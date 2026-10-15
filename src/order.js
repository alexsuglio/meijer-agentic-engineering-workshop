import { availableQuantity } from './stock.js';

export function replaceOrderItem(order, sku, products) {
  const candidate = products.find(product => product.sku === sku);
  if (!candidate) throw new TypeError('Choose a known replacement SKU');
  if (sku === order.sku) throw new TypeError('Choose a different item');
  if (availableQuantity(candidate) < order.quantity) throw new RangeError('Not enough available units for this order');
  return { ...order, sku };
}
