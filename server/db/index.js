const db = require('./db')

// register models
const {
  User,
  Product,
  Category,
  Cart,
  CartItem,
  Wishlist,
  WishlistItem
} = require('./models/')

module.exports = {
  db,
  User,
  Product,
  Category,
  Cart,
  CartItem,
  Wishlist,
  WishlistItem
}
