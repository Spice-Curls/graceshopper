import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getWishlist, editWishlist} from '../store/index'
import {Link} from 'react-router-dom'

class Wishlist extends Component {
  constructor() {
    super()
    this.state = {
      total: 0,
      subTotal: 0
    }
  }
  render() {
    // const {total, subTotal} = this.state
    const {wishlistItems, totalPrice, changeAmount, buyerId} = this.props

    if (wishlistItems.length === 0) {
      return <div>Your Wishlist is empty</div>
    }
    return (
      <div className="wishlist-container">
        {wishlistItems.map((wishlistItem, idx) => {
          const quantity = []
          for (let amount = 1; amount <= wishlistItem.product.stock; amount++) {
            quantity.push(amount)
          }
          return (
            <div key={wishlistItem.id} className="wishlist">
              <div>name: {wishlistItem.product.name}</div>
              <select
                defaultValue={wishlistItem.quantity}
                onChange={ev => {
                  changeAmount(ev.target.value, wishlistItem)
                }}
              >
                {quantity.map(index => <option key={index}>{index}</option>)}
              </select>
              <img src={wishlistItem.product.imageURL} />
              <div>
                Item Total: {wishlistItem.quantity * wishlistItem.product.price}
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

const mapStateToProps = ({user, wishlistItems}) => {
  let totalPrice = 0
  if (wishlistItems.length) {
    totalPrice = wishlistItems.reduce((total, wishlistItem) => {
      total += wishlistItem.quantity * wishlistItem.price
      return total
    }, 0)
  }
  return {
    buyerId: user.id,
    wishlistItems,
    totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getWishlist: buyerId => dispatch(getWishlist(buyerId)),
    changeAmount: (amount, item) => dispatch(editWishlist(amount, item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)
