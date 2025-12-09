import { Role } from "../models/index.js";
import BaseCrudService from "./BaseCrudService.js";

class RoleService extends BaseCrudService {
  constructor() {
    super(Role);
  }

  async isAdmin(RoleId) {
    try {
      const adminRole = await Role.findOne({ where: { name: 'admin' } });
      if (!adminRole) {
        throw new Error('Admin role not found');
      }
      return adminRole.id === RoleId;
    } catch (error) {
      console.error("Error checking admin role:", error);
      throw error;
    }
  }
}

export default RoleService;