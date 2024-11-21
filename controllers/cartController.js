import CartService from "../services/cartService.js";

class CartController {
  cartService = new CartService();

  // Crear un nuevo carrito
  createCart = async (req, res) => {
    try {
      const { userId, deliveryAddress, email, city, state } = req.body;
      const cart = await this.cartService.createCart(userId, deliveryAddress, email, city, state);
      res.status(200).send({ success: true, message: cart });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Obtener el carrito de un usuario
  getCartByUserId = async (req, res) => {
    try {
      const cart = await this.cartService.getCartByUserId(req.params.userId);
      res.status(200).send({ success: true, message: cart });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Agregar un producto al carrito
  addProductToCart = async (req, res) => {
    try {
      const { cartId, productId, quantity } = req.body;
      const cart = await this.cartService.addProductToCart(cartId, productId, quantity);
      res.status(200).send({ success: true, message: cart });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message});
    }
  };

  // Eliminar un producto del carrito
  removeProductFromCart = async (req, res) => {
    try {
      const { cartId, productId } = req.body;
      const cart = await this.cartService.removeProductFromCart(cartId, productId);
      res.status(200).send({ success: true, message: cart });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message});
    }
  };

  generateOrder = async (req, res) => {
    try {
      const order = await this.cartService.generateOrder(req.params.userId);
      res.status(200).send({ success: true, message: order });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default CartController;