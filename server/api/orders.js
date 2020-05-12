const nodemailer = require('nodemailer')
const router = require('express').Router()
const {Order, CartItem, Product} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findAll({include: [CartItem]})
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/:buyerId', async (req, res, next) => {
  try {
    const order = await Order.findAll({where: {buyerId: req.params.buyerId}})
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/:buyerId', async (req, res, next) => {
  const {buyerId} = req.params
  const {
    shippingAddress,
    billingAddress,
    creditCard,
    cart,
    price
  } = req.body.order
  try {
    //create the order
    const newOrder = await Order.create({
      shippingAddress,
      billingAddress,
      totalAmount: price,
      buyerId,
      cartItems: cart
    })

    //update the order id and take out buyerId so it doesnt show in cart again
    await CartItem.update(
      {orderId: newOrder.id, buyerId: null},
      {where: {buyerId}}
    )

    //update the stock
    cart.forEach(async item => {
      const stock = item.product.stock
      await Product.update(
        {stock: stock - item.quantity},
        {where: {id: item.product.id}}
      )
    })

    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})


