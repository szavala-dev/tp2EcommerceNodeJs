import { Router } from "express";
import OrderController from "../controllers/OrderController.js";
import { authenticate, requireAdmin } from "../middlewares/auth.js";

const orderController = new OrderController();

const orderRoutes = Router();

orderRoutes.get("/", orderController.getAllOrders);
// Obtenercarrito por usuario
orderRoutes.get("/user/:id", orderController.getOrderByUserId);
// Ruta para obtener órdenes confirmadas
orderRoutes.get("/confirmed", orderController.getConfirmedOrders);
// Ruta para obtener órdenes pendientes
orderRoutes.get("/pending", orderController.getPendingOrders);
// Ruta para obtener órdenes preparadas
orderRoutes.get("/prepared", orderController.getPreparedOrders);
// Ruta para obtener órdenes enviadas
orderRoutes.get("/sent", orderController.getSentOrders);
// Ruta para obtener órdenes canceladas
orderRoutes.get("/canceled", orderController.getCanceledOrders);
orderRoutes.get("/:id", orderController.getOrderById);
orderRoutes.post("/", orderController.createOrder);
orderRoutes.put("/:id", authenticate, requireAdmin, orderController.updateOrder);
orderRoutes.delete("/:id", authenticate, requireAdmin, orderController.deleteOrder);

// Rutas para cambiar el estado de la orden
orderRoutes.put("/:id/confirm", authenticate, requireAdmin, orderController.confirmOrder);
orderRoutes.put("/:id/prepare", authenticate, requireAdmin, orderController.prepareOrder);
orderRoutes.put("/:id/send", authenticate, requireAdmin, orderController.sendOrder);
orderRoutes.put("/:id/cancel", authenticate, requireAdmin, orderController.cancelOrder); // Ruta para cancelar la orden

export default orderRoutes;