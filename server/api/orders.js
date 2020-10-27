const nodemailer = require('nodemailer')
const router = require('express').Router()
const {Order, CartItem, Product} = require('../db/models')
const uuid = require('uuid')
const stripe = require('stripe')(process.env.STRIPE_KEY)
module.exports = router

// route is api/orders
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
    const order = await Order.findAll({
      where: {buyerId: req.params.buyerId},
      include: [{model: CartItem, include: Product}]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/:buyerId?', async (req, res, next) => {
  const price = req.body.order.totalPrice
  const {token} = req.body.order
  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id
  })
  const idempotencyKey = uuid()
  await stripe.charges.create(
    {
      amount: price * 100,
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email,
      description: `Confirmation`,
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip
        }
      }
    },
    {
      idempotencyKey
    }
  )
  let {buyerId} = req.params
  const name = req.body.order.addresses.billing_name
  const {email} = token
  if (!buyerId) {
    buyerId = null
  }
  const shippingAddress = {
    line1: token.card.address_line1,
    line2: token.card.address_line2,
    city: token.card.address_city,
    country: token.card.address_country,
    postal_code: token.card.address_zip
  }
  const cart = req.body.order.cart
  try {
    const newOrder = await Order.create({
      shippingAddress: `${shippingAddress.line1}, ${shippingAddress.city}, ${
        shippingAddress.country
      }, ${shippingAddress.postal_code}`,
      billingAddress: `${shippingAddress.line1}, ${shippingAddress.city}, ${
        shippingAddress.country
      }, ${shippingAddress.postal_code}`,
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
      where: {id: newOrder.id},
      include: [{model: CartItem, include: Product}]
    })

    let arr = order.cartItems.map(products => {
      return {
        name: products.product.name,
        imageURL: products.product.imageURL,
        price: products.product.price,
        description: products.product.description,
        quantity: products.quantity
      }
    })

    const output = `
    <h3>Thank you for shopping with us at GraceShopper</h3>
      <p>Order Confirmation Number: ${order.id}</p>
        <ul>
          <li>Ship to ${name}</li>
          <li>Address: ${newOrder.shippingAddress}</li>
          <li>Email: ${email}</li>
          <li>Total Price: $${newOrder.totalAmount}</li>
        </ul>
        <ul>
    ${`${arr.map(
      product => `
      <li>${product.name} (${product.quantity})</li>
      <li>$${product.price}</li>
      <li>${product.description}</li>
      <img src='${product.imageURL}' style='width: 200px; height: 200px;'/>
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

    await transporter.sendMail({
      from: '"GraceShopper" <graceshopperspice@gmail.com>',
      to: email,
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

    res.json({newOrder, email})
  } catch (err) {
    next(err)
  }
})
