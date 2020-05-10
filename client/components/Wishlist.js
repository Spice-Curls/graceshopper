import React, {useEffect, Component} from 'react'
import {connect} from 'react-redux'
import {getWishlist} from '../store/index'

// useEffect(() => {
//   async function fetchData(id) {
//     const response = await getWishlist(id)
//     return response
//   }
//   fetchData(this.props.buyerId)
// }, [])

class Wishlist extends Component {
  componentDidMount() {
    this.props.getWishlist(this.props.buyerId)
  }
  render() {
    const wishlistItems = this.props.wishlists
    if (!wishlistItems) return <div>Wishlist Empty</div>
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
}

// const Wishlist = ({buyerId, wishlists, getWishlist}) => {
//   useEffect(() => {
//     async function fetchData(id) {
//       const response = await getWishlist(id)
//       return response
//     }
//     fetchData(buyerId)
//   }, [])
//   const {wishlistItems} = wishlists
//   if (wishlistItems) {
//     console.log(wishlistItems)
//     return (
//       <ul>
//         {wishlistItems.map(wishlist => (
//           <li key={wishlist.productId}>
//             <div>{wishlist.product.name}</div>
//             <img src={wishlist.product.imageURL} />
//             <div>{wishlist.product.description}</div>
//             <div>{wishlist.product.condition}</div>
//             <div>{wishlist.product.price}</div>
//             <div>{wishlist.quantity}</div>
//           </li>
//         ))}
//       </ul>
//     )
//   }
//   return <div>Wishlist empty</div>
// }

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
