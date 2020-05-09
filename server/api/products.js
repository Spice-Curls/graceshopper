const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

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

router.post('/:id', async (req, res, next) => {
  try {
    const user = req.params.id
    console.log(req.body)
    const product = Product.create({...req.body, sellerId: user})
    let imageUrl
    singleUpload(req, res, err => {
      if (err) {
        console.log(err)
      }
      imageUrl = res.json({imageUrl: req.file.location})
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})
