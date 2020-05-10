const router = require('express').Router()
const {Product} = require('../db/models')
const multer = require('multer')

module.exports = router

// const upload = multer();
const upload = require('./services/s3')
const singleUpload = upload.single('image')

//route is /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const products = await Product.findAll({where: {sellerId: req.params.id}})
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/:id', singleUpload, async (req, res, next) => {
  console.log(req.body.stock)
  const url = req.file.location
  try {
    const user = req.params.id
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      condition: req.body.condition,
      price: req.body.price,
      categoryId: req.body.categoryId,
      imageURL: url,
      sellerId: user,
      stock: req.body.stock
    })

    res.json(product)
  } catch (err) {
    next(err)
  }
})
