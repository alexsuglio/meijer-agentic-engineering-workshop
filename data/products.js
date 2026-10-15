// Synthetic inventory only. Tags are workshop metadata, not medical or dietary advice.
export const products = [
  { sku: 'OAT-001', name: 'Everyday oat drink', category: 'Chilled', packageSize: 1000, packageUnit: 'ml', priceCents: 349, onHand: 2, reserved: 2, reorderThreshold: 3, tags: ['vegan', 'gluten-free'], allergens: [], promotion: null },
  { sku: 'OAT-002', name: 'Harvest oat drink', category: 'Chilled', packageSize: 1000, packageUnit: 'ml', priceCents: 329, onHand: 20, reserved: 2, reorderThreshold: 4, tags: ['vegan', 'gluten-free'], allergens: [], promotion: null },
  { sku: 'OAT-003', name: 'Barista oat drink', category: 'Chilled', packageSize: 1000, packageUnit: 'ml', priceCents: 349, onHand: 12, reserved: 3, reorderThreshold: 4, tags: ['vegan', 'gluten-free'], allergens: [], promotion: null },
  { sku: 'OAT-004', name: 'Creamy oat drink', category: 'Chilled', packageSize: 1000, packageUnit: 'ml', priceCents: 379, onHand: 10, reserved: 2, reorderThreshold: 4, tags: ['vegan', 'gluten-free'], allergens: [], promotion: null },
  { sku: 'OAT-005', name: 'Organic oat drink', category: 'Chilled', packageSize: 1000, packageUnit: 'ml', priceCents: 399, onHand: 8, reserved: 2, reorderThreshold: 3, tags: ['vegan', 'gluten-free'], allergens: [], promotion: null },
  { sku: 'SOY-001', name: 'Smooth soy drink', category: 'Chilled', packageSize: 1000, packageUnit: 'ml', priceCents: 299, onHand: 15, reserved: 1, reorderThreshold: 3, tags: ['vegan', 'gluten-free'], allergens: ['soy'], promotion: null },
  { sku: 'ALM-001', name: 'Unsweetened almond drink', category: 'Chilled', packageSize: 1000, packageUnit: 'ml', priceCents: 349, onHand: 9, reserved: 1, reorderThreshold: 3, tags: ['vegan', 'gluten-free'], allergens: ['tree-nuts'], promotion: null },
  { sku: 'DAIRY-001', name: 'Whole milk', category: 'Chilled', packageSize: 1000, packageUnit: 'ml', priceCents: 249, onHand: 24, reserved: 6, reorderThreshold: 5, tags: ['gluten-free'], allergens: ['milk'], promotion: null },
  { sku: 'OAT-006', name: 'Reserve oat drink', category: 'Chilled', packageSize: 1000, packageUnit: 'ml', priceCents: 499, onHand: 8, reserved: 0, reorderThreshold: 2, tags: ['vegan', 'gluten-free'], allergens: [], promotion: null },
  { sku: 'OAT-007', name: 'Travel oat drink', category: 'Chilled', packageSize: 500, packageUnit: 'ml', priceCents: 199, onHand: 8, reserved: 0, reorderThreshold: 2, tags: ['vegan', 'gluten-free'], allergens: [], promotion: null },
  { sku: 'BAN-001', name: 'Banana bunch', category: 'Produce', packageSize: 5, packageUnit: 'count', priceCents: 179, onHand: 10, reserved: 8, reorderThreshold: 3, tags: ['vegan', 'gluten-free'], allergens: [], promotion: null },
  { sku: 'APL-001', name: 'Orchard apples', category: 'Produce', packageSize: 6, packageUnit: 'count', priceCents: 429, onHand: 18, reserved: 4, reorderThreshold: 4, tags: ['vegan', 'gluten-free'], allergens: [], promotion: null },
  { sku: 'AVO-001', name: 'Ready avocados', category: 'Produce', packageSize: 2, packageUnit: 'count', priceCents: 299, onHand: 3, reserved: 5, reorderThreshold: 2, tags: ['vegan', 'gluten-free'], allergens: [], promotion: null },
  { sku: 'SPIN-001', name: 'Baby spinach', category: 'Produce', packageSize: 200, packageUnit: 'g', priceCents: 229, onHand: 8, reserved: 5, reorderThreshold: 3, tags: ['vegan', 'gluten-free'], allergens: [], promotion: null },
  { sku: 'BREAD-001', name: 'Country sourdough', category: 'Bakery', packageSize: 500, packageUnit: 'g', priceCents: 399, onHand: 12, reserved: 4, reorderThreshold: 3, tags: ['vegan'], allergens: ['wheat'], promotion: null },
  { sku: 'BAGEL-001', name: 'Plain bagels', category: 'Bakery', packageSize: 4, packageUnit: 'count', priceCents: 349, onHand: 9, reserved: 2, reorderThreshold: 3, tags: ['vegan'], allergens: ['wheat'], promotion: 'BOGO' },
  { sku: 'GRAN-001', name: 'Crunchy granola', category: 'Pantry', packageSize: 400, packageUnit: 'g', priceCents: 349, onHand: 30, reserved: 5, reorderThreshold: 5, tags: ['vegan'], allergens: ['wheat', 'tree-nuts'], promotion: 'BOGO' },
  { sku: 'PASTA-001', name: 'Penne pasta', category: 'Pantry', packageSize: 500, packageUnit: 'g', priceCents: 149, onHand: 40, reserved: 10, reorderThreshold: 6, tags: ['vegan'], allergens: ['wheat'], promotion: null },
  { sku: 'SAUCE-001', name: 'Roasted tomato sauce', category: 'Pantry', packageSize: 500, packageUnit: 'g', priceCents: 279, onHand: 14, reserved: 3, reorderThreshold: 3, tags: ['vegan', 'gluten-free'], allergens: [], promotion: null },
  { sku: 'RICE-001', name: 'Long grain rice', category: 'Pantry', packageSize: 1000, packageUnit: 'g', priceCents: 299, onHand: 19, reserved: 5, reorderThreshold: 4, tags: ['vegan', 'gluten-free'], allergens: [], promotion: null },
  { sku: 'PEAS-001', name: 'Garden peas', category: 'Frozen', packageSize: 500, packageUnit: 'g', priceCents: 189, onHand: 16, reserved: 4, reorderThreshold: 3, tags: ['vegan', 'gluten-free'], allergens: [], promotion: null },
  { sku: 'BERRY-001', name: 'Berry medley', category: 'Frozen', packageSize: 500, packageUnit: 'g', priceCents: 449, onHand: 7, reserved: 5, reorderThreshold: 3, tags: ['vegan', 'gluten-free'], allergens: [], promotion: null },
  { sku: 'SOAP-001', name: 'Citrus dish soap', category: 'Household', packageSize: 500, packageUnit: 'ml', priceCents: 249, onHand: 11, reserved: 2, reorderThreshold: 3, tags: [], allergens: [], promotion: null },
  { sku: 'TEA-001', name: 'Evening herbal tea', category: 'Pantry', packageSize: 20, packageUnit: 'count', priceCents: 329, onHand: 8, reserved: 1, reorderThreshold: 2, tags: null, allergens: null, promotion: null }
];

export const initialState = {
  basket: [{ sku: 'GRAN-001', quantity: 2 }],
  order: { id: 'FC-1042', originalSku: 'OAT-001', sku: 'OAT-001', quantity: 2, requiredTags: ['vegan', 'gluten-free'], excludedAllergens: ['milk', 'soy', 'tree-nuts'] }
};
