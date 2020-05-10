const router = require('express').Router()
const {Order, CartItem} = require('../db/models')
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
    console.log('ORDER!!!', order)
    res.json(order)
  } catch (err) {
    next(err)
  }
})
