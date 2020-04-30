const db = require('./db')

// register models
const {User, Product, Category} = require('./models')

module.exports = {db, User, Product, Category}
