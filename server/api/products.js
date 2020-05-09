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

router.post('/:id', singleUpload, async (req, res, next) => {
  console.log(req.body)
  try {
    const user = req.params.id
    let imageUrl
    singleUpload(req, res, err => {
      if (err) {
        // console.log(err);
      }
      console.log(req.file)
      // imageUrl = res.json({imageUrl: req.body.imageURL})
      // console.log(imageUrl);
    })
    // const product = Product.create({...req.body, sellerId: user})
    // res.json(product)
  } catch (err) {
    next(err)
  }
})
