import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();


class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: { 
      type: DataTypes.DATE,
      allowNull: true,
    },
    RoleId: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    modelName: "User",
    hooks: {
      beforeCreate: async (user) => {
        if (user.pass) {
          const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
          const hashedPassword = await bcrypt.hash(user.pass, saltRounds);
          user.pass = hashedPassword;
        }
      },
    },
  }
);

export default User;
