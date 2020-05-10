const Sequelize = require('sequelize')
const db = require('../db')

const {STRING, UUID, UUIDV4} = Sequelize

const Category = db.define('category', {
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
  }
})

module.exports = Category
