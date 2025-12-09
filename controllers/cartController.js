import CartService from "../services/cartService.js";
import { validateRequiredFields } from "../utils/validators.js";

class CartController {
  cartService = new CartService();

  // Crear un nuevo carrito
  createCart = async (req, res) => {
    try {
      const { userId, deliveryAddress, email, city, state } = req.body;
      const { valid, missing } = validateRequiredFields(req.body, ['userId', 'deliveryAddress', 'email', 'city', 'state']);
      if (!valid) {
        return res.status(400).send({ success: false, message: `Missing fields: ${missing.join(', ')}` });
      }
      const cart = await this.cartService.createCart(userId, deliveryAddress, email, city, state);
      res.status(200).send({ success: true, message: cart });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Obtener el carrito de un usuario
  getCartByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).send({ success: false, message: 'userId is required' });
      }
      const cart = await this.cartService.getCartByUserId(userId);
      res.status(200).send({ success: true, message: cart });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Agregar un producto al carrito
  addProductToCart = async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
      const { valid, missing } = validateRequiredFields(req.body, ['userId', 'productId', 'quantity']);
      if (!valid) {
        return res.status(400).send({ success: false, message: `Missing fields: ${missing.join(', ')}` });
      }
      const cart = await this.cartService.addProductToCart(userId, productId, quantity);
      res.status(200).send({ success: true, message: cart });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message});
    }
  };

  // Eliminar un producto del carrito
  removeProductFromCart = async (req, res) => {
    try {
      const { userId, productId } = req.body;
      const { valid, missing } = validateRequiredFields(req.body, ['userId', 'productId']);
      if (!valid) {
        return res.status(400).send({ success: false, message: `Missing fields: ${missing.join(', ')}` });
      }
      const cart = await this.cartService.removeProductFromCart(userId, productId);
      res.status(200).send({ success: true, message: cart });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message});
    }
  };

  generateOrder = async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).send({ success: false, message: 'userId is required' });
      }
      const order = await this.cartService.generateOrder(userId);
      res.status(200).send({ success: true, message: order });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default CartController;