const router = require('express').Router()
module.exports = router

router.use('/search', require('./search'))
router.use('/users', require('./users'))
router.use('/categories', require('./categories'))
router.use('/products', require('./products'))
router.use('/cartItems', require('./cartItems'))
router.use('/wishlistItems', require('./wishlistItems'))
router.use('/orders', require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
