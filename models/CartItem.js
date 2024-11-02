import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class CartItem extends Model {}

CartItem.init(
  {
    CartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "CartItem",
  }
);

export default CartItem;