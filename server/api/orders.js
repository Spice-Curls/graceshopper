const nodemailer = require('nodemailer')
const router = require('express').Router()
const {Order, CartItem, Product} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findAll({include: [CartItem]})
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/:buyerId', async (req, res, next) => {
  try {
    const order = await Order.findAll({where: {buyerId: req.params.buyerId}})
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/:buyerId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {buyerId: req.params.buyerId},
      include: [{model: CartItem, include: Product}]
    })

    res.send(order)

    let arr = order.cartItems.map(products => {
      return {
        name: products.product.name,
        imageURL: products.product.imageURL,
        price: products.product.price,
        description: products.product.description
      }
    })
    console.log('PROD!!!!', arr)

    //   const productsOutput = `<ul>
    //   ${`${arr.map(
    //     product => `
    //     <li>${product.name}</li>
    //     <li>${product.price}</li>
    //     <li>${product.description}</li>
    //     <img src=cid:${product.imageURL}/>
    //   `
    //   )}`}
    // </ul>`

    const output = `
    <h3>Thank you for shopping with us at GraceShopper</h3>
      <p>Order Confirmation Number: ${order.id}</p>
        <ul>
          <li>Ship to Jonathan</li>
          <li>at 123 street</li>
          <li>Email: jncrdro@gmail.com'</li>
          <li>Phone: 1231231231</li>
        </ul>
        <ul>
    ${`${arr.map(
      product => `
      <li>${product.name}</li>
      <li>${product.price}</li>
      <li>${product.description}</li>
      <img src=cid:${product.imageURL}/>
    `
    )}`}
  </ul>
    `
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'graceshopperspice@gmail.com',
        pass: 'Gracetesting1'
      },
      tls: {rejectUnauthorized: false}
    })

    let info = await transporter.sendMail({
      from: '"GraceSHopper" <graceshopperspice@gmail.com>',
      to: 'jncrdro@gmail.com',
      subject: 'Order Confirmation',
      text: 'Testing',
      html: output,
      attachments: [
        {
          filename: arr.map(products => products.imageURL).join(''),
          // path: arr.map(products => products.imageURL).join(''), For images to show but not working properly
          cid: arr.map(products => products.imageURL).join('')
        }
      ]
    })
    console.log('INFO!!!', info)
    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  } catch (ex) {
    next(ex)
  }
})

// const user = await User.findOne({where: {id: req.params.buyerId}})
// let products = order.cartItems.reduce((acc, product) => {
//   if (product.product.name !== acc.name) {
//     acc.products = {
//       name: product.product.name,
//       imageURL: product.product.imageURL,
//       price: product.product.price,
//       description: product.product.description
//     }
//   }
//   return acc
// }, {})

// console.log('PRODUCTS!!!!!!', products)

// console.log('USER!!!', user)
// console.log('ORDER!!!', order.cartItems.map)
