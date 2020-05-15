import React from 'react'
import {connect} from 'react-redux'
import {addToCart, addToWishlist} from '../store/index'

const CategoryProducts = ({match, categories, addCart, addWish, user}) => {
  const category = categories.find(
    find => find.name.toLowerCase() === match.params.category
  )
  const add = product => {
    if (Object.values(user).length === 0) {
      const cart = window.localStorage.getItem('cart')
      if (!cart) {
        window.localStorage.setItem('cart', JSON.stringify([product]))
      } else {
        const newCart = JSON.parse(cart)
        newCart.push(product)
        window.localStorage.setItem('cart', JSON.stringify(newCart))
      }
    }
    addCart(product)
  }
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
              <button type="submit" onClick={() => add(product)}>
                Add To Cart
              </button>
            </div>
          )
        })}
    </div>
  )
}

const mapState = ({categories, user}) => {
  return {
    categories,
    user
  }
}

const mapDispatch = dispatch => {
  return {
    addCart: product => dispatch(addToCart(product)),
    addWish: wishlist => dispatch(addToWishlist(wishlist))
  }
}

export default connect(mapState, mapDispatch)(CategoryProducts)
