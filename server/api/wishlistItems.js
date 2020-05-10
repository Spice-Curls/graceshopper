const router = require('express').Router()
const {WishlistItem, Wishlist} = require('../db/models')
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
    const {product} = req.body
    const {id} = req.user

    let wishlistItem = await Wishlist.findOne({
      where: {buyerId: id}
    })
    if (!wishlistItem) {
      wishlistItem = await Wishlist.create({buyerId: id})
    }
    const wishItem = await WishlistItem.findOne({
      where: {productId: product.id, wishlistId: wishlistItem.id}
    })
    if (wishItem) {
      const quantity = wishItem.quantity + 1
      await wishItem.update({quantity: quantity})
      res.status(201).json(wishItem)
    } else {
      const newProduct = await WishlistItem.create({
        productId: product.id,
        quantity: 1,
        wishlistId: wishlistItem.id
      })
      res.status(201).json(newProduct)
    }
  } catch (ex) {
    next(ex)
  }
})
