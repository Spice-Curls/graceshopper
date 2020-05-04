const Sequelize = require('sequelize')
const db = require('../db')
const {UUID, UUIDV4} = Sequelize

const Cart = db.define('cart', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  }
})

module.exports = Cart
