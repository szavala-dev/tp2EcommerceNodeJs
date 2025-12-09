import RoleService from "../services/RoleService.js";
import { validateRequiredFields } from "../utils/validators.js";

class RoleController {
  roleService = new RoleService();

  // Crear un nuevo rol
  createRole = async (req, res) => {
    try {
      const { valid, missing } = validateRequiredFields(req.body, ['name']);
      if (!valid) {
        return res.status(400).send({ success: false, message: `Missing fields: ${missing.join(', ')}` });
      }
      const role = await this.roleService.create(req.body);
      res.status(200).send({ success: true, message: role });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Obtener todos los roles
  getAllRoles = async (req, res) => {
    try {
      const roles = await this.roleService.findAll();
      res.status(200).send({ success: true, message: roles });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Obtener un rol por ID
  getRoleById = async (req, res) => {
    try {
      const role = await this.roleService.findById(req.params.id);
      if (!role) {
        return res.status(404).send({ success: false, message: "Role not found" });
      }
      res.status(200).send({ success: true, message: role });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Actualizar un rol por ID
  updateRole = async (req, res) => {
    try {
      if ('name' in req.body) {
        const { valid, missing } = validateRequiredFields(req.body, ['name']);
        if (!valid) {
          return res.status(400).send({ success: false, message: `Missing fields: ${missing.join(', ')}` });
        }
      }
      const role = await this.roleService.update(req.params.id, req.body);
      res.status(200).send({ success: true, message: role });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Eliminar un rol por ID
  deleteRole = async (req, res) => {
    try {
      const role = await this.roleService.delete(req.params.id);
      res.status(200).send({ success: true, message: role });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message,});
    }
  };
}

export default RoleController;