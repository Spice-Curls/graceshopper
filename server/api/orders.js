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
  const {buyerId} = req.params
  const {
    shippingAddress,
    billingAddress,
    creditCard,
    cart,
    price
  } = req.body.order
  try {
    //create the order
    const newOrder = await Order.create({
      shippingAddress,
      billingAddress,
      totalAmount: price,
      buyerId,
      cartItems: cart
    })

    //update the order id and take out buyerId so it doesnt show in cart again
    await CartItem.update(
      {orderId: newOrder.id, buyerId: null},
      {where: {buyerId}}
    )
    
   const order = await Order.findOne({
      where: {buyerId: req.params.buyerId},
      include: [{model: CartItem, include: Product}]
    })
   
    let arr = order.cartItems.map(products => {
      return {
        name: products.product.name,
        imageURL: products.product.imageURL,
        price: products.product.price,
        description: products.product.description
      }
    })
    
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

    //update the stock
    cart.forEach(async item => {
      const stock = item.product.stock
      await Product.update(
        {stock: stock - item.quantity},
        {where: {id: item.product.id}}
      )
    })

    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})
