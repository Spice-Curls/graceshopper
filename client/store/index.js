import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'

//wishlist
import wishlistReducer from './wishlist/reducer'
import {_addToWishlist, _getWishlist} from './wishlist/actions'
import {getWishlist, addToWishlist} from './wishlist/thunks'

//products
import userProductsReducer from './userProducts/reducer'
import {
  getUserProducts,
  addProduct,
  editProduct,
  removeProduct
} from './userProducts/thunks'

//cart
import cartReducer from './cart/reducer'
import {addToCart, getCart, editCart} from './cart/thunks'

//categories
import categoriesReducer from './categories/reducer'
import {getCategories} from './categories/thunks'

//order
import ordersReducer from './orders/reducer'
import {createOrder} from './orders/thunks'

const reducer = combineReducers({
  user,
  cartItems: cartReducer,
  categories: categoriesReducer,
  userProducts: userProductsReducer,
  wishlists: wishlistReducer,
  orders: ordersReducer
})

// const addToCart = product => async dispatch => {
//   const cartItem = (await axios.post(`/api/cartItems`, {product})).data
//   console.log(cartItem)
//   dispatch(_addToCart(cartItem))
// }

// const getCart = (buyerId) => {
//   return async (dispatch) => {
//     const cart = (await axios.get(`/api/cartItems/${buyerId}`)).data
//     dispatch(_getCart(cart))
//   }
// }

// const getWishlist = (buyerId) => async (dispatch) => {
//   const products = (await axios.get(`/api/wishlists/${buyerId}`)).data
//   dispatch(_getWishlist(products))
// }

// const getCategories = () => {
//   return async (dispatch) => {
//     const categories = (await axios.get('/api/categories')).data
//     dispatch(_getCategories(categories))
//   }
// }

// const getUserProducts = (userId) => {
//   return async (dispatch) => {
//     const products = (await axios.get(`/api/products/${userId}`)).data
//     dispatch(_getUserProducts(products))
//   }
// }

// const addProduct = (_product, formData, userId) => {
//   return async (dispatch) => {
//     const product = (
//       await axios.post(`/api/products/${userId}`, formData, _product)
//     ).data
//     dispatch(_addProduct(product))
//   }
// }

// const addToWishlist = (product) => async (dispatch) => {
//   const wishlistProduct = (await axios.post(`/api/wishlistItems`, {product}))
//     .data
//   dispatch(_addToWishlist(wishlistProduct))
// }

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
  addToWishlist,
  editCart,
  createOrder,
  removeProduct,
  editProduct
}

export * from './user'
