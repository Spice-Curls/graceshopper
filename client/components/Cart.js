import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, editCart} from '../store/index'
import {Link} from 'react-router-dom'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      total: 0,
      subTotal: 0
    }
  }
  render() {

    // const {total, subTotal} = this.state
    const {cartItems, totalPrice, changeAmount, buyerId} = this.props

    const currentCart = JSON.parse(localStorage.getItem('cart'))

    if (cartItems.length === 0) {
      return <div>cart is empty</div>
    }
    return (
      <div>
        {cartItems.map((cartItem, idx) => {
          const quantity = []
          for (let amount = 1; amount <= cartItem.product.stock; amount++) {
            quantity.push(amount)
          }
          return (
            <div key={idx}>
              <div>name: {cartItem.product.name}</div>
              <select
                defaultValue={cartItem.quantity}
                onChange={ev => {
                  changeAmount(ev.target.value, cartItem)
                }}
              >
                {quantity.map(index => <option key={index}>{index}</option>)}
              </select>
              <div>
                Item Total: {cartItem.quantity * cartItem.product.price}
              </div>
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
  if (cartItems.length) {
    totalPrice = cartItems.reduce((total, cartItem) => {
      total += cartItem.quantity * cartItem.price
      return total
    }, 0)
  }
  return {
    buyerId: user.id,
    cartItems,
    totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: buyerId => dispatch(getCart(buyerId)),
    changeAmount: (amount, item) => dispatch(editCart(amount, item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
