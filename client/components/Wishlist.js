import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getWishlist} from '../store/index'

const Wishlist = ({buyerId, wishlists, getWishlist}) => {
  useEffect(() => {
    async function fetchData() {
      const response = await getWishlist(buyerId)
      return response
    }
    fetchData()
  }, [])
  const {wishlistItems} = wishlists
  if (wishlistItems) {
    console.log(wishlistItems)
    return (
      <ul>
        {wishlistItems.map(wishlist => (
          <li key={wishlist.productId}>
            <div>{wishlist.product.name}</div>
            <img src={wishlist.product.imageURL} />
            <div>{wishlist.product.description}</div>
            <div>{wishlist.product.condition}</div>
            <div>{wishlist.product.price}</div>
            <div>{wishlist.quantity}</div>
          </li>
        ))}
      </ul>
    )
  }
  return <div>Wishlist empty</div>
}

const mapState = ({user, wishlists}) => {
  return {
    buyerId: user.id,
    wishlists
  }
}
const mapDispatch = dispatch => {
  return {
    getWishlist: buyerId => dispatch(getWishlist(buyerId))
  }
}

export default connect(mapState, mapDispatch)(Wishlist)
