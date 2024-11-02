import { Cart, CartItem, Product, Order } from "../models/index.js";
import sequelize from "../connection/connection.js"; // Importar la instancia de Sequelize

class CartService {
  // Crear un nuevo carrito
  async createCart(userId, deliveryAddress, email, city, state) {
    try {
      const cart = await Cart.create({ UserId: userId, delivery_address: deliveryAddress, email, city, state });
      return cart;
    } catch (error) {
      console.error("Error creating cart:", error);
      throw error;
    }
  }

  // Obtener el carrito de un usuario
  async getCartByUserId(userId) {
    try {
      const cart = await Cart.findOne({
        where: { UserId: userId },
        include: [{ model: CartItem, include: [Product] }],
      });
      return cart;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  }

  // Agregar un producto al carrito
  async addProductToCart(cartId, productId, quantity) {
    const transaction = await sequelize.transaction();
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error("Product not found");
      }

      const cartItem = await CartItem.findOne({ where: { CartId: cartId, ProductId: productId } });
      if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save({ transaction });
      } else {
        await CartItem.create({
          CartId: cartId,
          ProductId: productId,
          quantity,
        }, { transaction });
      }

      await transaction.commit();
      return await this.getCartByUserId(cartId);
    } catch (error) {
      await transaction.rollback();
      console.error("Error adding product to cart:", error);
      throw error;
    }
  }

  // Eliminar un producto del carrito
  async removeProductFromCart(cartId, productId) {
    try {
      const cartItem = await CartItem.findOne({ where: { CartId: cartId, ProductId: productId } });
      if (cartItem) {
        await cartItem.destroy();
      }
      return await this.getCartByUserId(cartId);
    } catch (error) {
      console.error("Error removing product from cart:", error);
      throw error;
    }
  }

  // Generar una orden desde el carrito
  async generateOrder(userId) {
    const transaction = await sequelize.transaction();
    try {
      const cart = await this.getCartByUserId(userId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      const orderData = {
        UserId: userId,
        products: JSON.stringify(cart.CartItems.map(item => ({
          ProductId: item.ProductId,
          quantity: item.quantity,
          price: item.Product.price
        }))),
        delivery_address: cart.delivery_address,
        city: cart.city,
        state: cart.state,
        shipping: 10.0, // Ejemplo de costo de envío
        totalprice: cart.CartItems.reduce((total, item) => total + item.quantity * item.Product.price, 0) + 10.0,
        status: 'PagoPendiente',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const order = await Order.create(orderData, { transaction });

      // Reducir el stock de los productos
      for (const item of cart.CartItems) {
        const product = await Product.findByPk(item.ProductId, { transaction });
        if (product) {
          product.stock -= item.quantity;
          await product.save({ transaction });
        }
      }

      // Eliminar los ítems del carrito
      await CartItem.destroy({ where: { CartId: cart.id }, transaction });

      await transaction.commit();
      return order;
    } catch (error) {
      await transaction.rollback();
      console.error("Error generating order:", error);
      throw error;
    }
  }
}

export default CartService;