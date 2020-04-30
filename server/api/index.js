const router = require('express').Router()
module.exports = router

router.use('/api/users', require('./users'))
router.use('/api/categories', require('./categories'))
router.use('/api/products', require('./products'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
