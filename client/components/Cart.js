import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store/index'

class Cart extends Component {
  componentDidMount() {
    this.props.getCart(this.props.buyerId)
  }
  render() {
    const {cart} = this.props
    console.log(1)
    if (!cart.cartItems) {
      return <div>cart is empty</div>
    }
    return (
      <div>
        {cart.cartItems.map(cartItem => (
          <div key={cartItem.id}>
            <div>name: {cartItem.product.name}</div>
            <div>quantity: {cartItem.quantity}</div>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({user, cart}) => {
  return {
    buyerId: user.id,
    cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: buyerId => dispatch(getCart(buyerId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
