import React from 'react'
import {connect} from 'react-redux'
import {addToCart, addToWishlist} from '../store/index'

const CategoryProducts = ({match, categories, addCart, addWish}) => {
  const category = categories.find(
    find => find.name.toLowerCase() === match.params.category
  )
  return (
    <div className="product-container">
      {category &&
        category.products.map(product => {
          return (
            <div className="product" key={product.id}>
              <h3>{product.name}</h3>
              <img src={product.imageURL} />
              <h3>{product.description}</h3>
              <h3>{product.condition}</h3>
              <h3>{product.price}</h3>
              <h3>Stock: {product.stock}</h3>
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
