export function renderSuggestions(container, result, replace) {
  container.replaceChildren();
  const message = document.createElement('p');
  message.className = 'suggestion-message';
  message.textContent = result.message;
  container.append(message);
  // Lab 3: render explained candidates and wire each explicit Replace button.
}
