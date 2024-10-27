import { User } from "../models/index.js";
import sequelize from "../connection/connection.js";

class UserService {
  getAllUsersService = async () => {
    try {
      const data = await User.findAll({
        attributes: ["name"],
        include: Role,
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  getUserByIdService = async (id) => {
    try {
      const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'lastname', 'mail', 'dni', 'dateOfBirth', 'address', 'city', 'state', 'RoleId']
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  };

  async createUserService(userData) {
    const transaction = await sequelize.transaction();
    try {
      const user = await User.create(userData, { transaction });
      await Cart.create({
        UserId: user.id,
        delivery_address: userData.address,
        email: userData.mail,
        city: userData.city,
        state: userData.state
      }, { transaction });
      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      console.error("Error creating user:", error);
      throw error;
    }
  };

  async updateUserService(id, userData) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      await user.update(userData);
      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async deleteUserService(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      await user.destroy();
      return { success: true, message: "User deleted successfully" };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  async getBestCustomer() {
    const transaction = await sequelize.transaction();
    try {
      const [results, metadata] = await sequelize.query(`
        SELECT TOP 1
          UserId, 
          SUM(totalprice) AS totalSpent
        FROM Orders
        WHERE status != 'Cancelado'
        GROUP BY UserId
        ORDER BY totalSpent DESC
      `, { transaction });

      console.log("Query Results:", results); // Agregar para depuración

      if (results.length === 0) {
        throw new Error("No customers found");
      }

      const bestCustomer = results[0];
      const user = await User.findByPk(bestCustomer.UserId, {
        attributes: ['id', 'name', 'mail'], // Asegúrate de que estos nombres de columna coincidan con tu base de datos
        transaction
      });

      await transaction.commit();
      return {
        ...user.toJSON(),
        totalSpent: bestCustomer.totalSpent
      };
    } catch (error) {
      await transaction.rollback();
      console.error("Error fetching best customer:", error);
      throw error;
    }
  }
}

export default UserService;