import { Op } from "sequelize";
import { Product, Order } from "../models/index.js";
import logger from "../middlewares/logger.js";
import sequelize from "../connection/connection.js";
import { aggregateProductSales } from "../utils/salesAggregator.js";

class ProductService {
  // Create a new product
  async createProduct(productData) {
    const transaction = await sequelize.transaction(); // Iniciar transacción
    try {
      // Verificar que todos los atributos requeridos no sean nulos
      const requiredAttributes = ['name', 'description', 'price', 'brand', 'stock', 'category'];
      for (const attribute of requiredAttributes) {
        if (productData[attribute] == null) {
          throw new Error(`Attribute ${attribute} cannot be null`);
        }
      }
  
      // Verificar que el stock no sea negativo
      if (productData.stock < 0) {
        throw new Error("Stock cannot be negative");
      }
  
      const product = await Product.create(productData, { transaction });
      await transaction.commit(); // Confirmar la transacción si todo sale bien
      return product;
    } catch (error) {
      await transaction.rollback(); // Revertir la transacción si ocurre un error
      logger.error(`Failed to create product: ${error.message}`);
      throw new Error("Failed to create product");
    }
  }

  // Get all products
  async getAllProducts() {
    try {
      const products = await Product.findAll();
      return products;
    } catch (error) {
      logger.error(`Failed to fetch products: ${error.message}`);
      throw new Error("Failed to fetch products");
    }
  }

  // Get a product by ID
  async getProductById(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        logger.warn(`Product with ID ${id} not found`);
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      logger.error(`Failed to fetch product with ID ${id}: ${error.message}`);
      throw new Error("Failed to fetch product");
    }
  }

  async updateProduct(id, productData) {
    const transaction = await sequelize.transaction(); // Iniciar transacción
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        logger.warn(`Product with ID ${id} not found for update`);
        throw new Error("Product not found");
      }
  
      // Verificar que ningún atributo se actualice a nulo o vacío
      for (const key in productData) {
        if (productData[key] == null || productData[key] === '') {
          throw new Error(`Attribute ${key} cannot be null or empty`);
        }
      }
  
      // Verificar que todos los atributos requeridos no sean nulos
      const requiredAttributes = ['name', 'description', 'price', 'brand', 'stock', 'category'];
      for (const attribute of requiredAttributes) {
        if (productData[attribute] == null) {
          throw new Error(`Attribute ${attribute} cannot be null`);
        }
      }
  
      // Verificar que el stock y el precio no sean negativos
      if (productData.stock < 0 || productData.price < 0) {
        throw new Error("Stock or Price cannot be negative");
      }
  
      await product.update(productData, { transaction });
      await transaction.commit(); // Confirmar la transacción si todo sale bien
      return product;
    } catch (error) {
      await transaction.rollback(); // Revertir la transacción si ocurre un error
      logger.error(`Failed to update product with ID ${id}: ${error.message}`);
      throw new Error("Failed to update product");
    }
  }
// Delete a product by ID
async deleteProduct(id) {
  const transaction = await sequelize.transaction(); // Iniciar transacción
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      logger.warn(`Product with ID ${id} not found for deletion`);
      throw new Error("Product not found");
    }
    await product.destroy({ transaction });
    await transaction.commit(); // Confirmar la transacción si todo sale bien
    return product;
  } catch (error) {
    await transaction.rollback(); // Revertir la transacción si ocurre un error
    logger.error(`Failed to delete product with ID ${id}: ${error.message}`);
    throw new Error("Failed to delete product");
  }
}
  async getProductBySales(ordering = 'desc') {
    const orders = await Order.findAll({
      where: { status: { [Op.ne]: 'Cancelado' } },
      attributes: ['products', 'id']
    });

    const salesMap = aggregateProductSales(orders);
    if (salesMap.size === 0) {
      throw new Error("No products found");
    }

    const sortedEntries = [...salesMap.entries()].sort((a, b) =>
      ordering === 'asc' ? a[1] - b[1] : b[1] - a[1]
    );

    const [productId, totalQuantity] = sortedEntries[0];
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    return { product, totalQuantity };
  }

  //  Obtener el producto más vendido
  async getBestSellingProduct() {
    try {
      return await this.getProductBySales('desc');
    } catch (error) {
      logger.error(`Failed to fetch best selling product: ${error.message}`);
      throw new Error("Failed to fetch best selling product");
    }
  }

  // Obtener el producto menos vendido
  async getLeastSellingProduct() {
    try {
      return await this.getProductBySales('asc');
    } catch (error) {
      logger.error(`Failed to fetch least selling product: ${error.message}`);
      throw new Error("Failed to fetch least selling product");
    }
  }

}

export default ProductService;