const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const products = await Product.findAll({})
    console.log('PRODUCTS!!!!', products)
    res.json(products)
  } catch (err) {
    next(err)
  }
})
