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
import {addToCart, getCart, editCart, removeItemFromCart} from './cart/thunks'

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
  editProduct,
  removeItemFromCart
}

export * from './user'
