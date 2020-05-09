import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import axios from 'axios'
import user from './user'

// reducers
import cartReducer from './cart/reducer'
import categoriesReducer from './categories/reducer'
import userProductsReducer from './userProducts/reducer'
import wishlistReducer from './wishlist/reducer'

// actions
import {_getCategories} from './categories/actions'
import {_getCart, _addToCart} from './cart/actions'
import {_getUserProducts, _addProduct} from './userProducts/actions'
import {_addToWishlist, _getWishlist} from './wishlist/actions'

const reducer = combineReducers({
  user,
  cart: cartReducer,
  categories: categoriesReducer,
  userProducts: userProductsReducer,
  wishlists: wishlistReducer
})

const addToCart = product => async dispatch => {
  const productCart = (await axios.post(`/api/cartItems`, {product})).data
  dispatch(_addToCart(productCart))
}

const getCart = buyerId => {
  return async dispatch => {
    const cart = (await axios.get(`/api/cart/${buyerId}`)).data
    dispatch(_getCart(cart))
  }
}

const getWishlist = buyerId => async dispatch => {
  const products = (await axios.get(`/api/wishlists/${buyerId}`)).data
  dispatch(_getWishlist(products))
}

const getCategories = () => {
  return async dispatch => {
    const categories = (await axios.get('/api/categories')).data
    dispatch(_getCategories(categories))
  }
}

const getUserProducts = userId => {
  return async dispatch => {
    const products = (await axios.get(`/api/products/${userId}`)).data
    dispatch(_getUserProducts(products))
  }
}

const addProduct = (_product, formData, userId) => {
  return async dispatch => {
    const product = (await axios.post(
      `/api/products/${userId}`,
      formData,
      _product
    )).data
    dispatch(_addProduct(product))
  }
}

const addToWishlist = product => async dispatch => {
  const wishlistProduct = (await axios.post(`/api/wishlistItems`, {product}))
    .data
  dispatch(_addToWishlist(wishlistProduct))
}

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store

export {
  getCategories,
  getUserProducts,
  addProduct,
  getCart,
  addToCart,
  getWishlist,
  addToWishlist
}

export * from './user'
