import React from 'react'
import {connect} from 'react-redux'
import {addToCart, addToWishlist} from '../store/index'

const CategoryProducts = ({match, categories, addCart, addWish}) => {
  const category = categories.find(
    find => find.name.toLowerCase() === match.params.category
  )
  return (
    <div>
      {category &&
        category.products.map(product => {
          return (
            <div key={product.id}>
              <div>{product.name}</div>
              <img src={product.imageURL} />
              <div>{product.description}</div>
              <div>{product.condition}</div>
              <div>{product.price}</div>
              <button type="submit" onClick={() => addWish(product)}>
                Add To Wishlist
              </button>
              <button type="submit" onClick={() => addCart(product)}>
                Add To Cart
              </button>
            </div>
          )
        })}
    </div>
  )
}

const mapState = ({categories}) => {
  return {
    categories
  }
}

const mapDispatch = dispatch => {
  return {
    addCart: product => dispatch(addToCart(product)),
    addWish: wishlist => dispatch(addToWishlist(wishlist))
  }
}

export default connect(mapState, mapDispatch)(CategoryProducts)
