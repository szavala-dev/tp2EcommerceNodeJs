import RoleService from "../services/RoleService.js";

class RoleController {
  roleService = new RoleService();

  // Crear un nuevo rol
  createRole = async (req, res) => {
    try {
      const role = await this.roleService.createRoleService(req.body);
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
      const roles = await this.roleService.getAllRolesService();
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
      const role = await this.roleService.getRoleByIdService(req.params.id);
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
      const role = await this.roleService.updateRoleService(req.params.id, req.body);
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
      const role = await this.roleService.deleteRoleService(req.params.id);
      res.status(200).send({ success: true, message: role });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };
}

export default RoleController;