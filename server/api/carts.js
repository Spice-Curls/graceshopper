const router = require('express').Router()
const {Cart, CartItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({include: [CartItem]})
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
