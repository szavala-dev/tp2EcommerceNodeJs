import logger from '../middlewares/logger.js';

export const aggregateProductSales = (orders) => {
  const salesMap = new Map();

  for (const order of orders) {
    if (!order?.products) {
      continue;
    }

    let parsedProducts;
    try {
      parsedProducts = JSON.parse(order.products);
    } catch (error) {
      logger.warn(`Failed to parse products payload for order ${order.id}: ${error.message}`);
      continue;
    }

    if (!Array.isArray(parsedProducts)) {
      continue;
    }

    for (const item of parsedProducts) {
      const productId = Number(item?.ProductId);
      const quantity = Number(item?.quantity);
      if (!Number.isInteger(productId) || !Number.isFinite(quantity)) {
        continue;
      }
      salesMap.set(productId, (salesMap.get(productId) || 0) + quantity);
    }
  }

  return salesMap;
};
