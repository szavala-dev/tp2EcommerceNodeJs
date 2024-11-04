import { Router } from "express";
import OrderController from "../controllers/orderController.js";

const orderController = new OrderController();

const orderRoutes = Router();

orderRoutes.get("/", orderController.getAllOrders);
orderRoutes.get("/:id", orderController.getOrderById);
// Obtenercarrito por usuario
orderRoutes.get("/user/:id", orderController.getOrderByUserId);
orderRoutes.post("/", orderController.createOrder);
orderRoutes.put("/:id", orderController.updateOrder);
orderRoutes.delete("/:id", orderController.deleteOrder);

// Rutas para cambiar el estado de la orden
orderRoutes.put("/:id/confirm", orderController.confirmOrder);
orderRoutes.put("/:id/prepare", orderController.prepareOrder);
orderRoutes.put("/:id/send", orderController.sendOrder);
orderRoutes.put("/:id/cancel", orderController.cancelOrder); // Ruta para cancelar la orden

// Ruta para obtener órdenes confirmadas
orderRoutes.get("/confirmed", orderController.getConfirmedOrders);

// Ruta para obtener órdenes pendientes
orderRoutes.get("/pending", orderController.getPendingOrders);

// Ruta para obtener órdenes enviadas
orderRoutes.get("/sent", orderController.getSentOrders);

// Ruta para obtener órdenes canceladas
orderRoutes.get("/canceled", orderController.getCanceledOrders);

export default orderRoutes;