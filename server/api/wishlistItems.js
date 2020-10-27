const router = require('express').Router()
const {WishlistItem, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const wishlistItems = await WishlistItem.findAll()
    res.json(wishlistItems)
  } catch (err) {
    next(err)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const {product, cartQuantity, localStorage} = req.body
    if (req.user) {
      const {id} = req.user
      const item = await WishlistItem.findOne({
        where: {productId: product.id, buyerId: id},
        include: [Product]
      })
      if (item) {
        const quantity = cartQuantity
          ? item.quantity + cartQuantity
          : item.quantity + 1
        await item.update({
          quantity
        })
        res.status(201).json(item)
      } else {
        const newItem = await WishlistItem.create({
          productId: product.id,
          quantity: cartQuantity ? cartQuantity : 1,
          buyerId: id
        })
        const updatedItem = await WishlistItem.findByPk(newItem.id, {
          include: [Product]
        })
        res.status(201).json(updatedItem)
      }
    } else if (localStorage) {
      const duplicate = localStorage.find(item => item.productId === product.id)
      if (duplicate) {
        duplicate.quantity = cartQuantity
          ? duplicate.quantity + cartQuantity
          : duplicate.quantity + 1
        res.json(duplicate)
      } else {
        const wishlistItem = await WishlistItem.create({
          productId: product.id,
          quantity: cartQuantity ? cartQuantity : 1,
          buyerId: null
        })
        const item = await WishlistItem.findByPk(wishlistItem.id, {
          include: [Product]
        })
        res.json(item)
      }
    } else {
      const wishlistItem = await WishlistItem.create({
        productId: product.id,
        quantity: 1,
        buyerId: null
      })
      const item = await WishlistItem.findByPk(wishlistItem.id, {
        include: [Product]
      })
      res.json(item)
    }
  } catch (ex) {
    next(ex)
  }
})

router.get('/:buyerId', async (req, res) => {
  const wishlistItems = await WishlistItem.findAll({
    where: {
      buyerId: req.params.buyerId
    },
    include: [Product]
  })
  res.json(wishlistItems)
})

router.put('/:buyerId/:id', async (req, res, next) => {
  const {id, buyerId} = req.params
  const {quantity} = req.body
  try {
    await WishlistItem.update({quantity}, {where: {buyerId, id}})
    const updated = await WishlistItem.findOne({
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
    await WishlistItem.destroy({where: {id, buyerId}})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
