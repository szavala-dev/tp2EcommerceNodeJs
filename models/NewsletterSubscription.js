import { DataTypes, Model } from 'sequelize';
import connection from '../connection/connection.js';

class NewsletterSubscription extends Model {}

NewsletterSubscription.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize: connection,
    modelName: 'NewsletterSubscription',
    tableName: 'NewsletterSubscriptions',
    timestamps: true,
  }
);

export default NewsletterSubscription;
