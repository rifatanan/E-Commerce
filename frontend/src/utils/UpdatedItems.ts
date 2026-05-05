export const getUpdatedItems = (items: any[], newItem: any) => {
  const updated = [...items];
  const existing = updated.find(i => i.productId === newItem.productId);

  if (existing) {
    existing.quantity += newItem.quantity;
  } else {
    updated.push(newItem);
  }

  return updated;
};