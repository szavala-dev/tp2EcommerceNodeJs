import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, Cart} from "../models/index.js";
import sequelize from "../connection/connection.js";
import Role from '../models/Role.js'; 

class UserService {

  login = async (mail, pass) => {
    try {
      const user = await User.findOne({ where: { mail } });
      if (!user) {
        throw new Error('Invalid credentials');
      }
      console.log("User found:", user);
      const isMatch = await bcrypt.compare(pass, user.pass);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }
      // Crear el token JWT
      const token = jwt.sign({ id: user.id, mail: user.mail }, 'your_jwt_secret', { expiresIn: '1h' });
      return { token };
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  getAllUsers = async () => {
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

  getUserById = async (id) => {
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

  createUser = async (userData) => {
    const { name, lastname, mail, dni, pass, dateOfBirth, address, city, state, RoleId } = userData;
    const hashedPassword = await bcrypt.hash(pass, 10); // Hashear la contraseña
    const transaction = await sequelize.transaction();
    try {
      // Crear el usuario
      const user = await User.create({
        name,
        lastname,
        mail,
        dni,
        pass: hashedPassword, // Almacenar la contraseña en texto plano
        dateOfBirth,
        address,
        city,
        state,
        RoleId
      }, { transaction });
      // Crear el carrito para el usuario
      await Cart.create({
        UserId: user.id,
        delivery_address: user.address,
        email: user.mail,
        city: user.city,
        state: user.state
      }, { transaction });
      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      console.error("Error creating user and cart:", error);
      throw error;
    }
  };

  updateUser = async (id, userData) => {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      // Verificar si la contraseña está presente en los datos de actualización
      if (userData.pass) {
        userData.pass = await bcrypt.hash(userData.pass, 10); // Hashear la nueva contraseña
      }
      await user.update(userData);
      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  deleteUser = async (id) => {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      await user.destroy();
      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };
  
  
  getBestCustomer = async () => {
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
  };
}

export default UserService;