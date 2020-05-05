const router = require('express').Router()
const {WishlistItem} = require('../db/models')
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
    console.log('CART!!!', req.body.wishlist)
    let wish = await WishlistItem.create(req.body.wishlist)
    res.json(wish)
  } catch (ex) {
    next(ex)
  }
})
