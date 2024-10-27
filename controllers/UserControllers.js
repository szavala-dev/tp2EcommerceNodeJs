import UserService from "../services/userService.js";
import sequelize from "../connection/connection.js"; // Asegúrate de importar la instancia de Sequelize

class UserControllers {
  userService = new UserService();

  getAllUsers = async (req, res) => {
    try {
      const users = await this.userService.getAllUsersService();
      res.status(200).send({ success: true, message: users });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  getUserById = async (req, res) => {
    try {
      const user = await this.userService.getUserByIdService(req.params.id);
      res.status(200).send(user);
    } catch (error) {
      res.status(404).send({
        success: false,
        message: error.message,
      });
    }
  };

  createUser = async (req, res) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(200).send({ success: true, user });
    } catch (error) {
      console.error("Error creating user and cart:", error);
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  updateUser = async (req, res) => {
    try {
      const user = await this.userService.updateUserService(req.params.id, req.body);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const user = await this.userService.deleteUserService(req.params.id);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  getBestCustomer = async (req, res) => {
    try {
      const customer = await this.userService.getBestCustomer();
      res.status(200).send({ success: true, message: customer });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };
}

export default UserControllers;