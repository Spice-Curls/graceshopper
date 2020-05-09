const router = require('express').Router()
const {Wishlist, WishlistItem, Product} = require('../db/models')
module.exports = router

router.get('/:buyerId', async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({
      where: {buyerId: req.params.buyerId},
      include: [{model: WishlistItem, include: [Product]}]
    })
    res.json(wishlist)
  } catch (ex) {
    next(ex)
  }
})
