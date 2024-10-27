import { User, Cart, Role } from "../models/index.js";
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
    try {
      const bestCustomer = await Order.findAll({
        attributes: [
          'UserId',
          [sequelize.fn('COUNT', sequelize.col('Order.id')), 'orderCount'],
          [sequelize.fn('SUM', sequelize.col('totalprice')), 'totalSpent']
        ],
        group: ['UserId'],
        order: [
          [sequelize.fn('SUM', sequelize.col('totalprice')), 'DESC'],
          [sequelize.fn('COUNT', sequelize.col('Order.id')), 'DESC']
        ],
        limit: 1,
        include: [{ model: User, attributes: ['id', 'name', 'lastname', 'mail'] }]
      });

      if (bestCustomer.length === 0) {
        throw new Error("No customers found");
      }

      return bestCustomer[0];
    } catch (error) {
      console.error("Error fetching best customer:", error);
      throw error;
    }
  }
}

export default UserService;