import UserService from '../services/UserService.js';
import jwt from 'jsonwebtoken';
import RoleService from '../services/RoleService.js';


class UserControllers {
  userService = new UserService();
  roleService = new RoleService();

  checkAdmin = async (req, res) => {
    try {
      const { RoleId } = req.body;
      const isAdmin = await this.roleService.isAdmin(RoleId);
      res.status(200).send({ success: true, isAdmin });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { mail, pass } = req.body;
      if (!mail || !pass) {
        return res.status(400).send({ success: false, message: 'Mail and password are required' });
      }
      const { token } = await this.userService.login(mail, pass);
      res.status(200).send({ success: true, token });
    } catch (error) {
      res.status(401).send({ success: false, message: error.message });
    }
  };

  getUserByToken = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(400).send({ success: false, message: 'Token is required' });
      }
      const user = await this.userService.getUserByToken(token);
      res.status(200).send({ success: true, user });
    } catch (error) {
      res.status(401).send({ success: false, message: error.message });
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();
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
      const user = await this.userService.getUserById(req.params.id);
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
      const user = await this.userService.updateUser(req.params.id, req.body);
      res.status(200).send({ success: true, message: user });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.userService.deleteUser(id);
      res.status(200).send({ success: true, message: result.message });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
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