import { Router } from "express";
import UserControllers from "../controllers/userControllers.js";

const userControllers = new UserControllers();

const userRoutes = Router();
// Definir la ruta para el login antes de la ruta con parámetro :id
userRoutes.post("/login", userControllers.login);

userRoutes.get("/loginToken", userControllers.getUserByToken);

// Definir la ruta para obtener el mejor comprador antes de la ruta con parámetro :id
userRoutes.get("/best-customer", userControllers.getBestCustomer);

// Definir las rutas para obtener, crear, actualizar y eliminar usuarios
userRoutes.get("/", userControllers.getAllUsers);
userRoutes.get("/:id", userControllers.getUserById);
userRoutes.post("/", userControllers.createUser);
userRoutes.put("/:id", userControllers.updateUser);
userRoutes.delete("/:id", userControllers.deleteUser);


export default userRoutes;