const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, UUID, UUIDV4, TEXT, ENUM, DECIMAL} = Sequelize

const Product = db.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageURL: {
    type: STRING,
    allowNull: false
  },
  description: {
    type: TEXT,
    allowNull: false
  },
  condition: {
    type: ENUM(
      'New',
      'Used - Like New or Open Box',
      'Used - Very Good',
      'Used - Good',
      'Used - Acceptable'
    ),
    allowNull: false
  },
  price: {
    type: DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DECIMAL,
    allowNull: false
  }
})

module.exports = Product
