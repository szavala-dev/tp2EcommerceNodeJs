import Role from "./Role.js";
import User from "./User.js";
import Product from './Product.js';
import Order from './Order.js';
import ImageUrl from "./ImageUrl.js";
import Cart from "./Cart.js";
import CartItem from "./CartItem.js";
import NewsletterSubscription from './NewsletterSubscription.js';

// Relación de uno a muchos entre Role y User
Role.hasMany(User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.belongsTo(Role, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Relación de uno a muchos entre User y Order
User.hasMany(Order, { foreignKey: 'UserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'UserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Relación de uno a muchos entre User y Cart
User.hasOne(Cart, { foreignKey: 'UserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'UserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Relación de uno a muchos entre Cart y CartItem
Cart.hasMany(CartItem, { foreignKey: 'CartId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'CartId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Relación de uno a muchos entre Product y CartItem
Product.hasMany(CartItem, { foreignKey: 'ProductId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
CartItem.belongsTo(Product, { foreignKey: 'ProductId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Product.hasMany(ImageUrl, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ImageUrl.belongsTo(Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export { Role, User, Product, Order, ImageUrl, Cart, CartItem, NewsletterSubscription };