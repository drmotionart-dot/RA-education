/*
  distributeByLargestRemainder — proportional allocation using the
  Largest Remainder Method (Hare quota).

  Given an array of items with weights, distributes `total` indivisible
  units proportionally. Ties broken by orderKey ascending.

  For equal distribution (e.g. days across lessons), pass items with
  weightKey = 1 for every item.

  Returns a Map<id, allocated> or array of { id, allocated }.
*/
export function distributeByLargestRemainder(items, total, {
  idKey = '_id',
  weightKey = 'weight',
  orderKey = 'order',
  resultMap = false,
} = {}) {
  if (!items || items.length === 0) return resultMap ? new Map() : [];

  const totalWeight = items.reduce((sum, item) => sum + (item[weightKey] ?? 1), 0);
  if (totalWeight <= 0) return resultMap ? new Map() : [];

  const raw = items.map((item) => {
    const proportion = (item[weightKey] ?? 1) / totalWeight;
    const rawValue = proportion * total;
    return {
      id: item[idKey],
      order: item[orderKey] ?? 0,
      rawValue,
      allocated: Math.floor(rawValue),
      remainder: rawValue - Math.floor(rawValue),
    };
  });

  const allocatedSum = raw.reduce((sum, r) => sum + r.allocated, 0);
  let remaining = total - allocatedSum;

  raw.sort((a, b) => b.remainder - a.remainder || a.order - b.order);

  for (const r of raw) {
    if (remaining <= 0) break;
    r.allocated += 1;
    remaining -= 1;
  }

  raw.sort((a, b) => a.order - b.order);

  if (resultMap) {
    return new Map(raw.map((r) => [r.id, r.allocated]));
  }

  return raw.map((r) => ({
    id: r.id,
    allocated,
  }));
}
