// Lab 3: implement the deterministic policy in docs/business-rules.md.
export function suggestSubstitutions(original, products, request) {
  if (!original || !Array.isArray(products) || !request || !Number.isSafeInteger(request.quantity) || request.quantity < 1) {
    throw new TypeError('A product, catalog, and positive integer requested quantity are required');
  }
  return { status: 'not-implemented', candidates: [], message: 'Automatic suggestions are not implemented. Use manual replacement below.' };
}
