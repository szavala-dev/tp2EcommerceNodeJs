import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Cart extends Model {}

Cart.init(
  {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    delivery_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "Cart",
  }
);

export default Cart;