import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store/index'

class Cart extends Component {
  componentDidMount() {
    this.props.getCart(this.props.buyerId)
  }
  render() {
    const {cart} = this.props
    const quantity = []
    for (let i = 0; i <= 20; i++) quantity.push(i)

    if (!cart.cartItems) {
      return <div>cart is empty</div>
    }
    return (
      <div>
        {cart.cartItems.map(cartItem => (
          <div key={cartItem.id}>
            <div>name: {cartItem.product.name}</div>
            <div>
              quantity:
              <select defaultValue={cartItem.quantity}>
                {quantity.map(number => <option>{number}</option>)}
              </select>
            </div>
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
