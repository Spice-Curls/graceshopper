const router = require('express').Router()
const {Cart, CartItem, Product} = require('../db/models')
module.exports = router
//route is /api/carts

router.get('/:buyerId', async (req, res, next) => {
  try {
    // console.log(await Cart.findAll())
    // console.log(req.params.buyerId)
    const cart = await Cart.findOne({
      where: {buyerId: req.params.buyerId},
      include: [{model: CartItem, include: [Product]}]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// router.get('/', async (req, res, next) => {
//   if (!req.user) {
//     res.status(401).send('User needs to be logged in')
//   }
//   try {
//     const cart = await Cart.findOne({
//       where: {buyerId: req.user.id},
//       include: [{model: CartItem, include: [Product]}],
//     })
//     res.json(cart)
//   } catch (err) {
//     next(err)
//   }
// })

// router.post('/', async (req, res, next) => {
//   try {
//     console.log('CARTS!!!', req.body.cart)
//     let products = await CartItem.create(req.body.cart)
//     res.json(products)
//   } catch (ex) {
//     next(ex)
//   }
// })
