const Sequelize = require('sequelize')
const db = require('../db')
const {UUID, UUIDV4, FLOAT} = Sequelize

const Wishlist = db.define('wishlist', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  }
})

module.exports = Wishlist
