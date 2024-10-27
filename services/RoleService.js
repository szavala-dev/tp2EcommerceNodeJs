import { Role } from "../models/index.js";

class RoleService {
  // Crear un nuevo rol
  async createRoleService(roleData) {
    try {
      const role = await Role.create(roleData);
      return role;
    } catch (error) {
      console.error("Error creating role:", error);
      throw error;
    }
  }

  // Obtener todos los roles
  async getAllRolesService() {
    try {
      const roles = await Role.findAll();
      return roles;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  }

  // Obtener un rol por ID
  async getRoleByIdService(id) {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error("Role not found");
      }
      return role;
    } catch (error) {
      console.error("Error fetching role by ID:", error);
      throw error;
    }
  }

  // Actualizar un rol por ID
  async updateRoleService(id, roleData) {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error("Role not found");
      }
      await role.update(roleData);
      return role;
    } catch (error) {
      console.error("Error updating role:", error);
      throw error;
    }
  }

  // Eliminar un rol por ID
  async deleteRoleService(id) {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error("Role not found");
      }
      await role.destroy();
      return { success: true, message: "Role deleted successfully" };
    } catch (error) {
      console.error("Error deleting role:", error);
      throw error;
    }
  }
}

export default RoleService;