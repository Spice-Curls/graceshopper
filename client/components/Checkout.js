import React, {Component} from 'react'
import {getCart} from '../store/index'
import {connect} from 'react-redux'
import {createOrder} from '../store/index'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      shippingAddress: '',
      billingAddress: '',
      creditCard: ''
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
      userId: this.props.match.params.userId,
      cart: this.props.cart,
      price: this.props.totalPrice
    })
  }
  render() {
    const {cart, totalPrice} = this.props
    const {shippingAddress, billingAddress, creditCard} = this.state
    const {placeOrder} = this
    return (
      <div>
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
        <form onSubmit={placeOrder}>
          <label>Shipping Address:</label>
          <input
            type="text"
            value={shippingAddress}
            onChange={ev => this.setState({shippingAddress: ev.target.value})}
          />
          <label>Billing Address:</label>
          <input
            type="text"
            value={billingAddress}
            onChange={ev => this.setState({billingAddress: ev.target.value})}
          />
          <label>Credit Card:</label>
          <input
            type="text"
            value={creditCard}
            onChange={ev => this.setState({creditCard: ev.target.value})}
          />
          <button>Place Order</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
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
    totalPrice
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: buyerId => dispatch(getCart(buyerId)),
    createOrder: order => dispatch(createOrder(order))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
