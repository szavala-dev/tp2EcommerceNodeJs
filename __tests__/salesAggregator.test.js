import { aggregateProductSales } from '../utils/salesAggregator.js';

describe('aggregateProductSales', () => {
  it('aggregates quantities per product', () => {
    const orders = [
      { id: 1, products: JSON.stringify([{ ProductId: 1, quantity: 2 }, { ProductId: 2, quantity: 1 }]) },
      { id: 2, products: JSON.stringify([{ ProductId: 1, quantity: 3 }]) },
    ];

    const result = aggregateProductSales(orders);
    expect(result.get(1)).toBe(5);
    expect(result.get(2)).toBe(1);
  });

  it('ignores invalid payloads', () => {
    const orders = [
      { id: 1, products: 'not-json' },
      { id: 2, products: JSON.stringify([{ ProductId: 'abc', quantity: 'x' }]) },
    ];

    const result = aggregateProductSales(orders);
    expect(result.size).toBe(0);
  });
});
