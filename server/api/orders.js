const router = require('express').Router()
const {Order, CartItem} = require('../db/models')
module.exports = router

router.use('/', async (req, res, next) => {
  try {
    const order = await Order.findAll({include: [CartItem]})
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.use('/:buyerId', async (req, res, next) => {
  try {
    const order = await Order.findAll({where: {buyerId: req.params.buyerId}})
    res.json(order)
  } catch (err) {
    next(err)
  }
})
