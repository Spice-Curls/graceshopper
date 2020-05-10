const db = require('./db')

// register models
const {
  User,
  Product,
  Category,
  CartItem,
  WishlistItem,
  Order
} = require('./models/')

module.exports = {
  db,
  User,
  Product,
  Category,
  CartItem,
  WishlistItem,
  Order
}
