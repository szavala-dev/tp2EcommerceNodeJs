import { Router } from "express";
import CartController from "../controllers/cartController.js";

const cartController = new CartController();

const cartRoutes = Router();

cartRoutes.post("/", cartController.createCart);
cartRoutes.get("/:userId", cartController.getCartByUserId);
cartRoutes.post("/add", cartController.addProductToCart);
cartRoutes.post("/remove", cartController.removeProductFromCart);
cartRoutes.post("/:userId/generate-order", cartController.generateOrder); // Ruta para generar la orden

export default cartRoutes;