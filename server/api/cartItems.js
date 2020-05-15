const router = require('express').Router()
const {CartItem, Product} = require('../db/models')
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
    const item = await CartItem.findOne({
      where: {productId: product.id, buyerId: id},
      include: [Product]
    })
    if (item) {
      const quantity = item.quantity + 1
      await item.update({
        quantity
      })
      res.status(201).json(item)
    } else {
      const newItem = await CartItem.create({
        productId: product.id,
        quantity: 1,
        buyerId: id
      })
      const updatedItem = await CartItem.findByPk(newItem.id, {
        include: [Product]
      })
      res.status(201).json(updatedItem)
    }
  } catch (ex) {
    next(ex)
  }
})

router.get('/:buyerId', async (req, res) => {
  const cartItems = await CartItem.findAll({
    where: {
      buyerId: req.params.buyerId
    },
    include: [Product]
  })
  res.json(cartItems)
})

router.put('/:buyerId/:id', async (req, res, next) => {
  const {id, buyerId} = req.params
  const {quantity} = req.body
  try {
    await CartItem.update({quantity}, {where: {buyerId, id}})
    const updated = await CartItem.findOne({
      where: {buyerId, id},
      include: [Product]
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

router.delete('/:buyerId/:id', async (req, res, next) => {
  const {id, buyerId} = req.params
  try {
    await CartItem.destroy({where: {id, buyerId}})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
