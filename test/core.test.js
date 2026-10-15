import test from 'node:test';
import assert from 'node:assert/strict';
import { products, initialState } from '../data/products.js';
import { availableQuantity } from '../src/stock.js';
import { formatMoney } from '../src/money.js';
import { availability, matchesAvailability } from '../src/availability.js';
import { lineTotal, basketTotal } from '../src/pricing.js';
import { replaceOrderItem } from '../src/order.js';
import { freshState, validateState } from '../src/state.js';

test('24 distinct synthetic products use integer stock and cents', () => {
  assert.equal(products.length, 24);
  assert.equal(new Set(products.map(product => product.sku)).size, 24);
  for (const product of products) {
    assert.ok(Number.isSafeInteger(product.priceCents) && product.priceCents >= 0);
    assert.ok(availableQuantity(product) >= 0);
    assert.ok(Number.isSafeInteger(product.packageSize));
  }
});
test('shared stock accounts for reservations and clamps at zero', () => {
  assert.equal(availableQuantity({ onHand: 10, reserved: 8 }), 2);
  assert.equal(availableQuantity({ onHand: 3, reserved: 5 }), 0);
  assert.throws(() => availableQuantity({ onHand: -1, reserved: 0 }), /onHand/);
});
test('catalog all-stock path works before classification is implemented', () => {
  const banana = products.find(product => product.sku === 'BAN-001');
  assert.equal(availability(banana).available, 2);
  assert.equal(matchesAvailability(banana, 'all'), true);
});
test('standard and even BOGO pricing work in the starter', () => {
  assert.equal(lineTotal({ priceCents: 349, promotion: null }, 3), 1047);
  assert.equal(lineTotal({ priceCents: 349, promotion: 'BOGO' }, 2), 349);
  assert.equal(lineTotal({ priceCents: 349, promotion: 'BOGO' }, 4), 698);
  assert.equal(basketTotal(initialState.basket, products), 349);
  assert.equal(formatMoney(698), '$6.98');
});
test('manual replacement works and preserves original requirements', () => {
  const result = replaceOrderItem(initialState.order, 'OAT-002', products);
  assert.equal(result.sku, 'OAT-002');
  assert.equal(result.originalSku, 'OAT-001');
  assert.equal(initialState.order.sku, 'OAT-001');
  assert.throws(() => replaceOrderItem(initialState.order, 'AVO-001', products), /Not enough/);
  assert.throws(() => replaceOrderItem(initialState.order, 'missing', products), /known/);
});
test('browser state is independent and rejects corrupted saved data', () => {
  const state = freshState();
  assert.deepEqual(validateState(state, products), initialState);
  state.basket[0].quantity = 3;
  assert.equal(initialState.basket[0].quantity, 2);
  assert.throws(() => validateState({ ...state, basket: [{ sku: 'GRAN-001', quantity: 1.2 }] }, products), /basket/);
  assert.throws(() => validateState({ ...state, order: { ...state.order, quantity: 999 } }, products), /order/);
});
