const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, UUID, UUIDV4, DECIMAL} = Sequelize

const Order = db.define('order', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  shippingAddress: {
    type: STRING,
    allowNull: false
  },
  billingAddress: {
    type: STRING,
    allowNull: false
  },
  totalAmount: {
    type: DECIMAL
  }
})

module.exports = Order
