const router = require('express').Router()
const {CartItem, Cart, User} = require('../db/models')
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
    const {product} = req.body
    const {id} = req.user
    let cart = await Cart.findOne({where: {buyerId: id}})
    if (!cart) {
      cart = await Cart.create({buyerId: id})
    }
    const item = await CartItem.findOne({
      where: {productId: product.id, cartId: cart.id}
    })
    if (item) {
      const quantity = item.quantity + 1
      await item.update({
        quantity: quantity
      })
      res.status(201).json(item)
    } else {
      const newItem = await CartItem.create({
        productId: product.id,
        quantity: 1,
        cartId: cart.id
      })
      res.status(201).json(newItem)
    }
  } catch (ex) {
    next(ex)
  }
})
