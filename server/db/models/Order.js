const Sequelize = require('Sequelize')
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
  totalPrice: {
    type: DECIMAL
  }
})

module.export = Order
