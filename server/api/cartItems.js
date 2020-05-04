const router = require('express').Router()
const {CartItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cartItems = await CartItem.findAll()
    res.json(cartItems)
  } catch (err) {
    next(err)
  }
})
