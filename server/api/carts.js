const router = require('express').Router()
const {Cart, CartItem} = require('../db/models')
module.exports = router
//route is /api/carts

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {buyerId: req.params.userId},
      include: [CartItem]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// router.post('/', async (req, res, next) => {
//   try {
//     console.log('CARTS!!!', req.body.cart)
//     let products = await CartItem.create(req.body.cart)
//     res.json(products)
//   } catch (ex) {
//     next(ex)
//   }
// })
