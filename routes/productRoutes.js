import { Router } from "express";
import ProductController from "../controllers/ProductController.js";
import { authenticate, requireAdmin } from "../middlewares/auth.js";
const productController = new ProductController();

const productRoutes = Router();

productRoutes.get("/best-selling", productController.getBestSellingProduct); // Ruta para obtener el producto más vendido
productRoutes.get("/least-selling", productController.getLeastSellingProduct); // Ruta para obtener el producto menos vendido
productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/:id", productController.getProductById);
productRoutes.post("/", authenticate, requireAdmin, productController.createProduct); // Ruta para crear un producto
productRoutes.put("/:id", authenticate, requireAdmin, productController.updateProduct);
productRoutes.delete("/:id", authenticate, requireAdmin, productController.deleteProduct);

export default productRoutes;