import { products } from '/data/products.js';
import { availability, matchesAvailability } from '/src/availability.js';
import { availableQuantity } from '/src/stock.js';
import { basketTotal, lineTotal } from '/src/pricing.js';
import { formatMoney } from '/src/money.js';
import { suggestSubstitutions } from '/src/substitutions.js';
import { replaceOrderItem } from '/src/order.js';
import { freshState, storageKey, validateState } from '/src/state.js';
import { renderSuggestions } from './substitution-panel.js';

const $ = selector => document.querySelector(selector);
const node = (tag, className, text) => {
  const result = document.createElement(tag);
  if (className) result.className = className;
  if (text !== undefined) result.textContent = text;
  return result;
};
let state = freshState();
let editable = true;
function reportError(error) {
  $('#error').textContent = error.message;
  $('#error').hidden = false;
}
function act(action) {
  try {
    $('#error').hidden = true;
    action();
  } catch (error) {
    reportError(error);
  }
}
try {
  const saved = localStorage.getItem(storageKey);
  if (saved !== null) state = validateState(JSON.parse(saved), products);
} catch (error) {
  editable = false;
  reportError(new Error(`Saved data could not be loaded: ${error.message}. Showing the seed preview; use Reset demo data before editing.`));
}
function persist(next, message) {
  if (!editable) throw new Error('Use Reset demo data before editing the seed preview.');
  validateState(next, products);
  try {
    localStorage.setItem(storageKey, JSON.stringify(next));
  } catch (error) {
    renderBasket();
    renderOrder();
    throw new Error(`Demo data was not saved: ${error.message}`, { cause: error });
  }
  state = next;
  $('#feedback').textContent = message;
  renderBasket();
  renderOrder();
}
function updateBasket(sku, quantity) {
  const product = products.find(product => product.sku === sku);
  if (!Number.isSafeInteger(quantity) || quantity < 0 || quantity > availableQuantity(product)) {
    renderBasket();
    throw new RangeError(`Quantity must be a whole number from 0 to ${availableQuantity(product)} for ${product.name}.`);
  }
  const basket = state.basket.filter(line => line.sku !== sku);
  if (quantity > 0) basket.push({ sku, quantity });
  persist({ ...state, basket }, `${product.name}: basket quantity ${quantity}.`);
}
function renderCatalog() {
  const search = $('#search').value.trim().toLowerCase();
  const department = $('#department').value;
  const filtered = products.filter(product =>
    `${product.name} ${product.sku}`.toLowerCase().includes(search) &&
    (department === 'all' || product.category === department) &&
    matchesAvailability(product, $('#availability').value));
  $('#results-count').textContent = `${filtered.length} of ${products.length}`;
  $('#products').replaceChildren();
  for (const product of filtered) {
    const info = availability(product);
    const card = node('article', 'product');
    card.dataset.sku = product.sku;
    const art = node('div', 'product-art');
    art.dataset.category = product.category;
    art.setAttribute('aria-hidden', 'true');
    art.append(node('span', 'package-icon', product.sku.split('-')[0].slice(0, 3)), node('span', 'product-category', product.category));
    const content = node('div', 'product-content');
    content.append(node('h3', '', product.name), node('p', 'sku', `${product.packageSize} ${product.packageUnit} / ${product.sku}`));
    const badge = node('span', 'badge', info.label);
    badge.dataset.status = info.status;
    content.append(badge, node('p', 'stock-detail', `${info.available} available / ${product.onHand} on hand / ${product.reserved} reserved`));
    if (product.promotion) content.append(node('p', 'promotion', 'BUY ONE, GET ONE FREE'));
    const bottom = node('div', 'product-bottom');
    const add = node('button', 'add-button', 'Add +');
    add.setAttribute('aria-label', `Add ${product.name} to basket`);
    add.disabled = availableQuantity(product) === 0;
    add.addEventListener('click', () => act(() => updateBasket(product.sku, (state.basket.find(line => line.sku === product.sku)?.quantity ?? 0) + 1)));
    bottom.append(node('span', 'price', formatMoney(product.priceCents)), add);
    content.append(bottom);
    card.append(art, content);
    $('#products').append(card);
  }
  if (!filtered.length) $('#products').append(node('p', 'empty', 'No products match these filters. Try All stock or a different search.'));
}
function renderBasket() {
  $('#basket').replaceChildren();
  for (const line of state.basket) {
    const product = products.find(product => product.sku === line.sku);
    const row = node('div', 'basket-line');
    row.append(node('h3', '', product.name));
    const controls = node('div', 'line-controls');
    const label = node('label', '', `Quantity: ${product.sku}`);
    const input = node('input');
    input.type = 'number';
    input.min = '0';
    input.max = String(availableQuantity(product));
    input.step = '1';
    input.value = String(line.quantity);
    input.setAttribute('aria-label', `Quantity for ${product.name}`);
    input.addEventListener('change', () => act(() => updateBasket(product.sku, input.value === '' ? NaN : Number(input.value))));
    label.append(input);
    const remove = node('button', 'remove', 'Remove');
    remove.setAttribute('aria-label', `Remove ${product.name}`);
    remove.addEventListener('click', () => act(() => updateBasket(product.sku, 0)));
    controls.append(label, remove, node('span', 'line-total', formatMoney(lineTotal(product, line.quantity))));
    row.append(controls);
    $('#basket').append(row);
  }
  if (!state.basket.length) $('#basket').append(node('p', 'muted', 'Your basket is empty. Add a product from the catalog.'));
  $('#basket-total').textContent = formatMoney(basketTotal(state.basket, products));
}
function replace(sku) {
  act(() => {
    const order = replaceOrderItem(state.order, sku, products);
    persist({ ...state, order }, `Order ${order.id}: explicitly replaced item with ${sku}.`);
    $('#suggestions').replaceChildren();
  });
}
function renderOrder() {
  const product = products.find(product => product.sku === state.order.sku);
  const current = node('div', 'order-current');
  current.append(node('p', '', `${state.order.quantity} x ${product.name} (${product.sku})`));
  current.append(node('p', '', `${availableQuantity(product)} available / ${formatMoney(product.priceCents)} list price each`));
  current.append(node('strong', '', availableQuantity(product) < state.order.quantity ? 'Action needed: unavailable quantity' : 'Replacement selected locally'));
  $('#order').replaceChildren(current);
  $('#manual-product').replaceChildren();
  for (const candidate of products.filter(item => item.sku !== state.order.sku && availableQuantity(item) >= state.order.quantity)) {
    const option = node('option', '', `${candidate.name} (${candidate.sku})`);
    option.value = candidate.sku;
    $('#manual-product').append(option);
  }
}
for (const department of [...new Set(products.map(product => product.category))].sort()) {
  const option = node('option', '', department);
  option.value = department;
  $('#department').append(option);
}
for (const selector of ['#search', '#department', '#availability']) {
  $(selector).addEventListener(selector === '#search' ? 'input' : 'change', () => act(renderCatalog));
}
$('#suggest').addEventListener('click', () => act(() => {
  const original = products.find(product => product.sku === state.order.originalSku);
  renderSuggestions($('#suggestions'), suggestSubstitutions(original, products, state.order), replace);
}));
$('#manual-replace').addEventListener('click', () => replace($('#manual-product').value));
$('#reset').addEventListener('click', () => act(() => {
  if (!confirm('Reset this browser demo basket and order? Your code and other browser data are not changed.')) return;
  localStorage.removeItem(storageKey);
  state = freshState();
  editable = true;
  $('#suggestions').replaceChildren();
  $('#feedback').textContent = 'Demo data reset. Code changes were not reset.';
  renderBasket();
  renderOrder();
  renderCatalog();
}));
try {
  renderCatalog();
  renderBasket();
  renderOrder();
} catch (error) {
  reportError(error);
}
