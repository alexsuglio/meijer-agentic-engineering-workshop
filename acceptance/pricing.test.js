import test from 'node:test';
import assert from 'node:assert/strict';
import { lineTotal, basketTotal } from '../src/pricing.js';

const bogo = { sku: 'A', priceCents: 349, promotion: 'BOGO' };
test('lab2: charge every unpaired BOGO unit, including 3 x 349 = 698', () => {
  for (const [quantity, expected] of [[0, 0], [1, 349], [2, 349], [3, 698], [4, 698], [5, 1047], [6, 1047], [7, 1396]]) {
    assert.equal(lineTotal(bogo, quantity), expected, `quantity=${quantity}`);
  }
});
test('lab2: standard prices remain unchanged, with no SKU mixing', () => {
  assert.equal(lineTotal({ ...bogo, promotion: null }, 3), 1047);
  const second = { ...bogo, sku: 'B' };
  assert.equal(basketTotal([{ sku: 'A', quantity: 1 }, { sku: 'B', quantity: 1 }], [bogo, second]), 698);
  assert.equal(basketTotal([{ sku: 'A', quantity: 3 }, { sku: 'B', quantity: 1 }], [bogo, second]), 1047);
  assert.equal(basketTotal([], [bogo]), 0);
});
test('lab2: reject invalid numbers, unknown promotion/SKU, duplicates and overflow', () => {
  for (const quantity of [-1, 1.5, NaN, Infinity, '3', undefined, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => lineTotal(bogo, quantity), TypeError);
  }
  for (const priceCents of [-1, 3.49, NaN, '349']) {
    assert.throws(() => lineTotal({ ...bogo, priceCents }, 3), TypeError);
  }
  assert.throws(() => lineTotal({ ...bogo, promotion: 'MYSTERY' }, 2), /promotion/);
  assert.throws(() => lineTotal({ ...bogo, priceCents: Number.MAX_SAFE_INTEGER, promotion: null }, 2), /line total/);
  assert.throws(() => basketTotal([{ sku: 'missing', quantity: 1 }], [bogo]), /Unknown SKU/);
  assert.throws(() => basketTotal([{ sku: 'A', quantity: 1 }, { sku: 'A', quantity: 1 }], [bogo]), /one line/);
});
