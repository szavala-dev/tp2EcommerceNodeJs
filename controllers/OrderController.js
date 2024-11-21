import OrderService from "../services/OrderService.js";

class OrderController {
  orderService = new OrderService();

  // Crear una nueva orden
  createOrder = async (req, res) => {
    try {
      const order = await this.orderService.createOrder(req.body);
      res.status(200).send({ success: true, message: order });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Obtener todas las órdenes
  getAllOrders = async (req, res) => {
    try {
      const orders = await this.orderService.getAllOrders();
      res.status(200).send({ success: true, message: orders });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Obtener órdenes por ID de usuario
  getOrderByUserId = async (req, res) => {
    try {
      const orders = await this.orderService.getOrdersByUserId(req.params.id);
      res.status(200).send({ success: true, orders });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Obtener una orden por ID
  getOrderById = async (req, res) => {
    try {
      const order = await this.orderService.getOrderById(req.params.id);
      res.status(200).send({ success: true, message: order });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Actualizar una orden por ID
  updateOrder = async (req, res) => {
    try {
      const order = await this.orderService.updateOrder(req.params.id, req.body);
      res.status(200).send({ success: true, message: order });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Eliminar una orden por ID
  deleteOrder = async (req, res) => {
    try {
      const order = await this.orderService.deleteOrder(req.params.id);
      res.status(200).send({ success: true, message: order });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message  });
    }
  };

  // Confirmar una orden
  confirmOrder = async (req, res) => {
    try {
      const order = await this.orderService.confirmOrder(req.params.id);
      res.status(200).send({ success: true, message: order });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Preparar una orden
  prepareOrder = async (req, res) => {
    try {
      const order = await this.orderService.prepareOrder(req.params.id);
      res.status(200).send({ success: true, message: order });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Enviar una orden
  sendOrder = async (req, res) => {
    try {
      const order = await this.orderService.sendOrder(req.params.id);
      res.status(200).send({ success: true, message: order });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Cancelar una orden
  cancelOrder = async (req, res) => {
    try {
      const order = await this.orderService.cancelOrder(req.params.id);
      res.status(200).send({ success: true, message: order });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Obtener órdenes confirmadas
  getConfirmedOrders = async (req, res) => {
    try {
      const { count, orders } = await this.orderService.getConfirmedOrders();
      res.status(200).send({ success: true, count, orders });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Obtener órdenes pendientes
  getPendingOrders = async (req, res) => {
    try {
      const { count, orders } = await this.orderService.getPendingOrders();
      res.status(200).send({ success: true, count, orders });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Obtener órdenes enviadas
  getSentOrders = async (req, res) => {
    try {
      const { count, orders } = await this.orderService.getSentOrders();
      res.status(200).send({ success: true, count, orders });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Obtener órdenes canceladas
  getCanceledOrders = async (req, res) => {
    try {
      const { count, orders } = await this.orderService.getCanceledOrders();
      res.status(200).send({ success: true, count, orders });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };
}

export default OrderController;