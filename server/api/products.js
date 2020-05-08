const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const product = await Product.findAll({
      where: {sellerId: req.params.userId}
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})
