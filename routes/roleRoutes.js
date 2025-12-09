import { Router } from "express";
import RoleController from "../controllers/RoleController.js";
import { authenticate, requireAdmin } from "../middlewares/auth.js";

const roleController = new RoleController();

const roleRoutes = Router();

roleRoutes.get("/", authenticate, requireAdmin, roleController.getAllRoles);
roleRoutes.get("/:id", authenticate, requireAdmin, roleController.getRoleById);
roleRoutes.post("/", authenticate, requireAdmin, roleController.createRole);
roleRoutes.put("/:id", authenticate, requireAdmin, roleController.updateRole);
roleRoutes.delete("/:id", authenticate, requireAdmin, roleController.deleteRole);

export default roleRoutes;