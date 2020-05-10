import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, editCart} from '../store/index'
import {Link} from 'react-router-dom'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      totalPrice: 0,
      subTotal: 0
    }
  }
  componentDidMount() {
    this.props.getCart(this.props.buyerId)
  }
  render() {
    // const {total, subTotal} = this.state

    const {cartItems, changeAmount} = this.props
    const {totalPrice} = this.state
    if (!cartItems) {
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
      </div>
    )
  }
}

const mapStateToProps = ({user, cartItems}) => {
  return {
    buyerId: user.id,
    cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: buyerId => dispatch(getCart(buyerId)),
    changeAmount: (amount, item) => dispatch(editCart(amount, item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
