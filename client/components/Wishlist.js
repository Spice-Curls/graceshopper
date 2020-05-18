import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

//thunks
import {
  getWishlist,
  editWishlist,
  removeItemFromWishlist,
  addToCart
} from '../store/index'

class Wishlist extends Component {
  constructor() {
    super()
    this.state = {
      total: 0,
      subTotal: 0
    }
  }
  render() {
    const {
      wishlistItems,
      totalPrice,
      changeAmount,
      removeItem,
      buyerId,
      addCart
    } = this.props

    if (wishlistItems && wishlistItems.length === 0) {
      return <div className="notnav">This Wishlist is Empty</div>
    }
    return (
      <div className="wishlist-container notnav">
        {wishlistItems &&
          wishlistItems.map(wishlistItem => {
            const quantity = []
            for (
              let amount = 1;
              amount <= wishlistItem.product.stock;
              amount++
            ) {
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
                  Item Total:{' '}
                  {wishlistItem.quantity * wishlistItem.product.price}
                </div>
                <button onClick={() => removeItem(wishlistItem)}>
                  Remove Item
                </button>
                <button
                  onClick={() => {
                    addCart(wishlistItem.product, wishlistItem.quantity)
                    removeItem(wishlistItem)
                  }}
                >
                  Move to Cart
                </button>
              </div>
            )
          })}
        <div>Total Price: {totalPrice}</div>
      </div>
    )
  }
}

const mapStateToProps = ({user, wishlistItems}) => {
  let totalPrice = 0
  if (!user.id) {
    const items = JSON.parse(window.localStorage.getItem('wishlist'))
    wishlistItems = items
  }
  if (wishlistItems && wishlistItems.length) {
    totalPrice = wishlistItems.reduce((total, wishlistItem) => {
      total += wishlistItem.quantity * wishlistItem.product.price
      return total
    }, 0)
  }
  return {
    buyerId: user.id || '',
    wishlistItems,
    totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getWishlist: buyerId => dispatch(getWishlist(buyerId)),
    changeAmount: (amount, item) => dispatch(editWishlist(amount, item)),
    removeItem: item => dispatch(removeItemFromWishlist(item)),
    addCart: (product, quantity) => dispatch(addToCart(product, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)
