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
    } else {
      addCart(product)
    }
  }
  return (
    <div>
      {category &&
        category.products.map(product => {
          return (
            <div className="product" key={product.id}>
              <div>{product.name}</div>
              <img src={product.imageURL} />
              <div>{product.description}</div>
              <div>{product.condition}</div>
              <div>{product.price}</div>
              <div>Stock: {product.stock}</div>
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
