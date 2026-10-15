import test from 'node:test';
import assert from 'node:assert/strict';
import { availability, matchesAvailability } from '../src/availability.js';
import { products } from '../data/products.js';

const fixture = (onHand, reserved, reorderThreshold) => ({ onHand, reserved, reorderThreshold });
test('lab1: reservation-aware labels, zero precedence and inclusive threshold', () => {
  for (const [product, expected] of [
    [fixture(10, 8, 3), { available: 2, status: 'low', label: 'Low stock' }],
    [fixture(8, 5, 3), { available: 3, status: 'low', label: 'Low stock' }],
    [fixture(8, 4, 3), { available: 4, status: 'in', label: 'In stock' }],
    [fixture(3, 5, 3), { available: 0, status: 'out', label: 'Out of stock' }],
    [fixture(0, 0, 0), { available: 0, status: 'out', label: 'Out of stock' }],
    [fixture(1, 0, 0), { available: 1, status: 'in', label: 'In stock' }]
  ]) assert.deepEqual(availability(product), expected);
});
test('lab1: filter uses exactly the same classification as badges', () => {
  const low = products.filter(product => matchesAvailability(product, 'low')).map(product => product.sku);
  assert.deepEqual(low, ['BAN-001', 'SPIN-001', 'BERRY-001']);
  assert.deepEqual(products.filter(product => matchesAvailability(product, 'out')).map(product => product.sku), ['OAT-001', 'AVO-001']);
  assert.deepEqual(products.filter(product => matchesAvailability(product, 'attention')).map(product => product.sku), ['OAT-001', 'BAN-001', 'AVO-001', 'SPIN-001', 'BERRY-001']);
  assert.equal(products.filter(product => matchesAvailability(product, 'all')).length, 24);
  assert.equal(products.filter(product => matchesAvailability(product, 'in')).length, 19);
});
test('lab1: classification and filtering preserve their inputs', () => {
  const product = Object.freeze(fixture(10, 8, 3));
  const before = structuredClone(product);
  availability(product);
  matchesAvailability(product, 'attention');
  assert.deepEqual(product, before);
});
test('lab1: invalid inputs are not silently classified', () => {
  for (const value of [-1, 1.1, NaN, '3', undefined]) {
    assert.throws(() => availability(fixture(10, 8, value)), TypeError);
  }
  assert.throws(() => matchesAvailability(fixture(10, 8, 3), 'unknown'), TypeError);
  assert.throws(() => availability(fixture(10, -1, 3)), TypeError);
});
