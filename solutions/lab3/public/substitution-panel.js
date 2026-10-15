import { formatMoney } from '../src/money.js';

export function renderSuggestions(container, result, replace) {
  container.replaceChildren();
  const message = document.createElement('p');
  message.className = 'suggestion-message';
  message.textContent = result.message;
  container.append(message);
  for (const candidate of result.candidates) {
    const card = document.createElement('article');
    card.className = 'candidate';
    card.dataset.sku = candidate.sku;
    const title = document.createElement('h3');
    title.textContent = `${candidate.name} (${candidate.sku})`;
    const price = document.createElement('p');
    price.textContent = `${formatMoney(candidate.priceCents)} each / ${candidate.available} available`;
    const explanation = document.createElement('p');
    explanation.textContent = candidate.reasons.join(' ');
    const button = document.createElement('button');
    button.className = 'button-secondary full';
    button.textContent = `Replace with ${candidate.name}`;
    button.setAttribute('aria-label', `Replace order item with ${candidate.sku}`);
    button.addEventListener('click', () => replace(candidate.sku));
    card.append(title, price, explanation, button);
    container.append(card);
  }
}
