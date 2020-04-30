const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    console.log(categories)
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const categories = await Category.findByPk(req.params.id)
    console.log(categories)
    res.json(categories)
  } catch (err) {
    next(err)
  }
})
