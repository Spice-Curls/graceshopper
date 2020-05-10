import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store/index'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      total: 0,
      subTotal: 0
    }
  }
  componentDidMount() {
    this.props.getCart(this.props.buyerId)
  }
  render() {
    // const {total, subTotal} = this.state
    const {cart, totalPrice} = this.props
    // console.log(cart)
    if (!cart || !cart.cartItems) {
      return <div>cart is empty</div>
    }
    return (
      <div>
        {cart.cartItems.map(cartItem => (
          <div key={cartItem.id}>
            <div>name: {cartItem.product.name}</div>
            <div>quantity: {cartItem.quantity}</div>
            <div>Item Total: {cartItem.quantity * cartItem.product.price}</div>
          </div>
        ))}
        <div>Total Price: {totalPrice}</div>
      </div>
    )
  }
}

const mapStateToProps = ({user, cart}) => {
  let totalPrice = 0
  if (cart && cart.cartItems) {
    totalPrice = cart.cartItems.reduce((total, cartItem) => {
      total += cartItem.quantity * cartItem.product.price
      return total
    }, 0)
  }
  return {
    buyerId: user.id,
    cart,
    totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: buyerId => dispatch(getCart(buyerId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
