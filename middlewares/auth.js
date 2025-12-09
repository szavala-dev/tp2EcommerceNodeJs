import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import RoleService from '../services/RoleService.js';

const roleService = new RoleService();

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ success: false, message: 'Authorization header required' });
    }

    const [, token] = authHeader.split(' ');
    if (!token) {
      return res.status(401).send({ success: false, message: 'Invalid authorization header' });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findByPk(decoded.id, { attributes: ['id', 'name', 'RoleId'] });
    if (!user) {
      return res.status(401).send({ success: false, message: 'User not found for token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ success: false, message: error.message });
  }
};

export const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({ success: false, message: 'Authentication required' });
    }

    const isAdmin = await roleService.isAdmin(req.user.RoleId);
    if (!isAdmin) {
      return res.status(403).send({ success: false, message: 'Admin privileges required' });
    }

    next();
  } catch (error) {
    return res.status(403).send({ success: false, message: error.message });
  }
};
