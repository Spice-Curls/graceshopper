const Sequelize = require('sequelize')
const db = require('../db')
const {UUID, UUIDV4, INTEGER} = Sequelize

const WishlistItem = db.define('wishlistItem', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  quantity: {
    type: INTEGER,
    defaultValue: 0
  }
})

module.exports = WishlistItem
