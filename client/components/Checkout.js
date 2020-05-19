import React, {Component} from 'react'
import {connect} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'

import {createOrder, getCart} from '../store/index'

class Checkout extends Component {
  constructor() {
    super()
    this.placeOrder = this.placeOrder.bind(this)
  }
  async componentDidMount() {
    const url = this.props.match.params.userId
    this.props.getCart(url)
  }
  placeOrder(token, addresses) {
    this.props.createOrder({
      userId: this.props.userId || '',
      cart: this.props.cart,
      token,
      addresses,
      totalPrice: this.props.totalPrice.toFixed(2)
    })
    this.props.history.push('/confirmation')
  }
  render() {
    const {cart, totalPrice} = this.props
    const {placeOrder} = this
    return (
      <div className="notnav">
        <h1>Checkout</h1>
        <ul>
          {cart &&
            cart.map(item => (
              <li key={item.id}>
                {item.product.name} - {item.product.price} ({item.quantity})
                <img src={item.product.imageURL} />
              </li>
            ))}
          <li>Total Price: {totalPrice.toFixed(2)}</li>
        </ul>
        <StripeCheckout
          stripeKey="pk_test_1XvQ9G3RqAuYvDGxXwMQaMYs00fHeB7gA0"
          token={placeOrder}
          billingAddress
          shippingAddress
          amount={totalPrice * 100}
        />
      </div>
    )
  }
}

const mapState = state => {
  if (!state.user.id) {
    state.cartItems = JSON.parse(window.localStorage.getItem('cart'))
  }
  let totalPrice = 0
  if (state.cartItems) {
    totalPrice = state.cartItems.reduce((total, cartItem) => {
      total += cartItem.quantity * cartItem.product.price
      return total
    }, 0)
  }
  return {
    url: state.match,
    cart: state.cartItems,
    totalPrice,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: buyerId => dispatch(getCart(buyerId)),
    createOrder: order => dispatch(createOrder(order))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
