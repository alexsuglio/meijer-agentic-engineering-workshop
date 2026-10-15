import test from 'node:test';
import assert from 'node:assert/strict';
import { products, initialState } from '../data/products.js';
import { suggestSubstitutions } from '../src/substitutions.js';
import { renderSuggestions } from '../public/substitution-panel.js';
import { replaceOrderItem } from '../src/order.js';

const original = products.find(product => product.sku === 'OAT-001');
const request = initialState.order;
const candidate = overrides => ({ ...original, sku: 'GOOD', name: 'Known candidate', onHand: 10, reserved: 1, ...overrides });
test('lab3: seed returns three explained candidates in deterministic order', () => {
  const before = JSON.stringify(products);
  const result = suggestSubstitutions(original, products, request);
  assert.equal(result.status, 'matches');
  assert.deepEqual(result.candidates.map(item => item.sku), ['OAT-003', 'OAT-002', 'OAT-004']);
  assert.equal(JSON.stringify(products), before);
  for (const item of result.candidates) {
    assert.equal(item.reasons.length, 5);
    assert.ok(item.reasons.join(' ').includes('120%'));
    assert.ok(item.reasons.join(' ').includes('1000 ml'));
    assert.ok(item.available >= 2);
  }
});
test('lab3: every hard rejection is independent of other filters', () => {
  const rejected = [
    { sku: original.sku }, { category: 'Pantry' }, { packageSize: 500 },
    { packageUnit: 'l' }, { onHand: 3, reserved: 2 }, { onHand: 1, reserved: 2 },
    { tags: ['vegan'] }, { allergens: ['soy'] }, { allergens: ['milk'] },
    { allergens: ['tree-nuts'] }, { tags: null }, { allergens: undefined },
    { category: null }, { packageSize: null }, { priceCents: null },
    { onHand: undefined }, { priceCents: 419 }
  ];
  for (const overrides of rejected) {
    const result = suggestSubstitutions(original, [candidate(overrides)], request);
    assert.equal(result.status, 'no-match', JSON.stringify(overrides));
    assert.deepEqual(result.candidates, []);
    assert.match(result.message, /No suitable replacements/);
  }
});
test('lab3: integer cap boundaries, stock equality, ties and max three', () => {
  assert.equal(suggestSubstitutions(original, [candidate({ priceCents: 418, onHand: 3, reserved: 1 })], request).candidates.length, 1);
  const hundred = { ...original, priceCents: 100 };
  const items = [
    candidate({ sku: 'C', priceCents: 110 }), candidate({ sku: 'B', priceCents: 90 }),
    candidate({ sku: 'A', priceCents: 110 }), candidate({ sku: 'D', priceCents: 120 }),
    candidate({ sku: 'E', priceCents: 121 })
  ];
  assert.deepEqual(suggestSubstitutions(hundred, items, request).candidates.map(item => item.sku), ['A', 'B', 'C']);
  assert.equal(suggestSubstitutions(hundred, [items[3]], request).candidates.length, 1);
  assert.equal(suggestSubstitutions(hundred, [items[4]], request).candidates.length, 0);
  assert.deepEqual(suggestSubstitutions(hundred, [...items].reverse(), request).candidates.map(item => item.sku), ['A', 'B', 'C']);
});
test('lab3: unknown original, bad requests, duplicate SKUs and large safe integers', () => {
  assert.equal(suggestSubstitutions({ ...original, tags: null }, products, request).status, 'no-match');
  for (const quantity of [0, -1, 1.5, NaN, '2']) {
    assert.throws(() => suggestSubstitutions(original, products, { ...request, quantity }), TypeError);
  }
  assert.throws(() => suggestSubstitutions(original, products, { ...request, excludedAllergens: null }), TypeError);
  assert.throws(() => suggestSubstitutions(original, [candidate({}), candidate({})], request), /Duplicate/);
  assert.equal(suggestSubstitutions(
    { ...original, priceCents: Number.MAX_SAFE_INTEGER },
    [candidate({ priceCents: Number.MAX_SAFE_INTEGER })], request
  ).candidates.length, 1);
});

class Element {
  constructor(tag) { this.tagName = tag; this.children = []; this.dataset = {}; this.events = {}; this.textContent = ''; this.attributes = {}; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  addEventListener(name, listener) { this.events[name] = listener; }
  setAttribute(name, value) { this.attributes[name] = value; }
}
function descendants(element) { return [element, ...element.children.flatMap(descendants)]; }
test('lab3: renderer shows explanations, replaces only after click, and clears no-match', () => {
  const previous = globalThis.document;
  globalThis.document = { createElement: tag => new Element(tag) };
  try {
    const container = new Element('div');
    let order = structuredClone(request);
    const result = suggestSubstitutions(original, products, request);
    renderSuggestions(container, result, sku => { order = replaceOrderItem(order, sku, products); });
    const elements = descendants(container);
    const buttons = elements.filter(item => item.tagName === 'button');
    assert.equal(buttons.length, 3);
    assert.ok(elements.some(item => item.textContent.includes('absolute price delta')));
    assert.equal(order.sku, 'OAT-001', 'rendering must not replace automatically');
    assert.equal(buttons[0].attributes['aria-label'], 'Replace order item with OAT-003');
    buttons[0].events.click();
    assert.equal(order.sku, 'OAT-003');
    renderSuggestions(container, suggestSubstitutions(original, [], request), () => assert.fail('No no-match action'));
    assert.equal(descendants(container).filter(item => item.tagName === 'button').length, 0);
    assert.match(container.children[0].textContent, /No suitable replacements/);
  } finally {
    if (previous === undefined) delete globalThis.document;
    else globalThis.document = previous;
  }
});
