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
