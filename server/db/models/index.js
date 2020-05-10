const User = require('./User')
const Category = require('./Category')
const Product = require('./Product')
const CartItem = require('./CartItem')
const WishlistItem = require('./WishlistItem')
const Order = require('./Order')

Product.belongsTo(User, {as: 'seller'})
User.hasMany(Product, {foreignKey: 'sellerId'})

Product.belongsTo(Category)
Category.hasMany(Product)

CartItem.belongsTo(User, {as: 'buyer'})
User.hasMany(CartItem, {foreignKey: 'buyerId'})
CartItem.belongsTo(Product)
Product.hasMany(CartItem)

WishlistItem.belongsTo(User, {as: 'buyer'})
User.hasMany(WishlistItem, {foreignKey: 'buyerId'})
WishlistItem.belongsTo(Product)
Product.hasMany(WishlistItem)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Category,
  Product,
  CartItem,
  WishlistItem,
  Order
}
