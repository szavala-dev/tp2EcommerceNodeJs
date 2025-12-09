import { Router } from "express";
import userRoutes from "./userRoutes.js";
import roleRoutes from "./roleRoutes.js";
import orderRoutes from "./orderRoutes.js";
import productRoutes from "./productRoutes.js";
import imageUrlRoutes from "./imageUrlRoutes.js";
import cartRoutes from "./cartRoutes.js"; // Importar las rutas de Cart
import uploadRoutes from "./uploadRoutes.js";
import newsletterRoutes from "./newsletterRoutes.js";
import logger from "../middlewares/logger.js"; // Asegúrate de que esta ruta sea correcta

const routes = Router();

// Middleware para usar logger en todas las solicitudes entrantes
routes.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

routes.use("/users", userRoutes);
routes.use("/roles", roleRoutes);
routes.use("/orders", orderRoutes);
routes.use("/products", productRoutes);
routes.use("/image-urls", imageUrlRoutes);
routes.use("/carts", cartRoutes); // Usar las rutas de Cart
routes.use("/uploads", uploadRoutes);
routes.use("/newsletter", newsletterRoutes);

export default routes;