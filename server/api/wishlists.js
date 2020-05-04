const router = require('express').Router()
const {Wishlist, WishlistItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findAll({include: [WishlistItem]})
    res.json(wishlist)
  } catch (err) {
    next(err)
  }
})
