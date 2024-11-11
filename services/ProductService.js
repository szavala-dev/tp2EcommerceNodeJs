import { Product } from "../models/index.js";
import logger from "../middlewares/logger.js";
import sequelize from "../connection/connection.js";

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

  // Update a product by ID
  async updateProduct(id, productData) {
    const transaction = await sequelize.transaction(); // Iniciar transacción
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        logger.warn(`Product with ID ${id} not found for update`);
        throw new Error("Product not found");
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

  //  Obtener el producto más vendido
  async getBestSellingProduct() {
    try {
      const bestSellingProduct = await Order.findAll({
        attributes: [
          'products',
          [sequelize.fn('SUM', sequelize.col('quantity')), 'totalQuantity']
        ],
        group: ['ProductId'],
        order: [[sequelize.fn('SUM', sequelize.col('quantity')), 'DESC']],
        limit: 1,
        include: [{ model: Product, attributes: ['id', 'name', 'price', 'stock'] }]
      });

      if (bestSellingProduct.length === 0) {
        throw new Error("No products found");
      }

      return bestSellingProduct[0];
    } catch (error) {
      console.error("Error fetching best selling product:", error);
      throw error;
    }
  }

    // Obtener el producto menos vendido
  async getLeastSellingProduct() {
    try {
      const leastSellingProduct = await Order.findAll({
        attributes: [
          'products',
          [sequelize.fn('SUM', sequelize.col('quantity')), 'totalQuantity']
        ],
        group: ['ProductId'],
        order: [[sequelize.fn('SUM', sequelize.col('quantity')), 'ASC']],
        limit: 1,
        include: [{ model: Product, attributes: ['id', 'name', 'price', 'stock'] }]
      });

      if (leastSellingProduct.length === 0) {
        throw new Error("No products found");
      }

      return leastSellingProduct[0];
    } catch (error) {
      console.error("Error fetching least selling product:", error);
      throw error;
    }
  }

}

export default ProductService;