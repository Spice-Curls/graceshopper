import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {createOrder, getCart} from '../store/index'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      shippingAddress: '',
      billingAddress: '',
      creditCard: '',
      email: ''
    }
    this.placeOrder = this.placeOrder.bind(this)
  }
  async componentDidMount() {
    const url = this.props.match.params.userId
    this.props.getCart(url)
  }
  placeOrder(ev) {
    // ev.preventDefault();
    this.props.createOrder({
      ...this.state,
      userId: this.props.userId || '',
      cart: this.props.cart,
      price: this.props.totalPrice
    })
  }
  render() {
    const {cart, totalPrice, userId} = this.props
    const {
      name,
      shippingAddress,
      billingAddress,
      creditCard,
      email
    } = this.state
    const {placeOrder} = this
    return (
      <div className="notnav">
        <h1>Checkout</h1>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.product.name} - {item.product.price} ({item.quantity})<img
                src={item.product.imageURL}
              />
            </li>
          ))}
          <li>Total Price: {totalPrice}</li>
        </ul>
        <form>
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={ev => this.setState({name: ev.target.value})}
            />
          </div>
          <div>
            <label>Shipping Address:</label>
            <input
              type="text"
              value={shippingAddress}
              onChange={ev => this.setState({shippingAddress: ev.target.value})}
            />
          </div>
          <div>
            <label>Billing Address:</label>
            <input
              type="text"
              value={billingAddress}
              onChange={ev => this.setState({billingAddress: ev.target.value})}
            />
          </div>
          <div>
            <label>Credit Card:</label>
            <input
              type="text"
              value={creditCard}
              onChange={ev => this.setState({creditCard: ev.target.value})}
            />
          </div>
          {!userId ? (
            <div>
              <label>Email:</label>
              <input
                type="text"
                value={email}
                onChange={ev => this.setState({email: ev.target.value})}
              />
            </div>
          ) : (
            ''
          )}
          <Link onClick={placeOrder} to="/confirmation">
            Place Order
          </Link>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  if (!state.user.id) {
    state.cartItems = JSON.parse(window.localStorage.getItem('cart'))
  }
  let totalPrice = 0
  if (state.cartItems.length) {
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
