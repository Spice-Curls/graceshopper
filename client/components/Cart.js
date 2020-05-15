import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

//thunks
import {getCart, editCart, removeItemFromCart} from '../store/index'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      total: 0,
      subTotal: 0
    }
  }
  render() {
    const {
      cartItems,
      totalPrice,
      changeAmount,
      buyerId,
      removeItem
    } = this.props

    if (cartItems && cartItems.length === 0) {
      return <div className="notnav">cart is empty</div>
    }
    return (
      <div className="cart-container notnav">
        {cartItems &&
          cartItems.map(cartItem => {
            const quantity = []
            for (let amount = 1; amount <= cartItem.product.stock; amount++) {
              quantity.push(amount)
            }
            return (
              <div key={cartItem.id} className="cart">
                <div>name: {cartItem.product.name}</div>
                <select
                  defaultValue={cartItem.quantity}
                  onChange={ev => {
                    changeAmount(ev.target.value, cartItem)
                  }}
                >
                  {quantity.map(index => <option key={index}>{index}</option>)}
                </select>
                <img src={cartItem.product.imageURL} />
                <div>
                  Item Total: {cartItem.quantity * cartItem.product.price}
                </div>
                <button onClick={() => removeItem(cartItem)}>
                  Remove Item
                </button>
              </div>
            )
          })}
        <div>Total Price: {totalPrice}</div>
        <Link to={`/checkout/${buyerId}`}>Proceed to Checkout</Link>
      </div>
    )
  }
}

const mapStateToProps = ({user, cartItems}) => {
  let totalPrice = 0
  if (!user.id) {
    const items = JSON.parse(window.localStorage.getItem('cart'))
    cartItems = items
  }
  if (cartItems && cartItems.length) {
    totalPrice = cartItems.reduce((total, cartItem) => {
      total += cartItem.quantity * cartItem.product.price
      return total
    }, 0)
  }
  return {
    buyerId: user.id || '',
    cartItems,
    totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: buyerId => dispatch(getCart(buyerId)),
    changeAmount: (amount, item) => dispatch(editCart(amount, item)),
    removeItem: item => dispatch(removeItemFromCart(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
