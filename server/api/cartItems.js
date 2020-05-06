const router = require('express').Router()
const {CartItem} = require('../db/models')
module.exports = router

//route is /api/cartItems

router.get('/', async (req, res, next) => {
  try {
    const cartItems = await CartItem.findAll()
    res.json(cartItems)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('CARTS!!!', req.body.cart)
    let products = await CartItem.create(req.body.cart)
    res.json(products)
  } catch (ex) {
    next(ex)
  }
})
