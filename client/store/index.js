import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'

//wishlist
import wishlistReducer from './wishlist/reducer'
import {
  getWishlist,
  addToWishlist,
  editWishlist,
  removeItemFromWishlist
} from './wishlist/thunks'

//products
import productsReducer from './products/reducer'
import {getProducts} from './products/thunks'

//user owned products
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
import {createOrder, getOrders} from './orders/thunks'

const reducer = combineReducers({
  user,
  cartItems: cartReducer,
  categories: categoriesReducer,
  userProducts: userProductsReducer,
  wishlistItems: wishlistReducer,
  orders: ordersReducer,
  products: productsReducer
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
  editProduct,
  removeProduct,
  getCart,
  addToCart,
  editCart,
  removeItemFromCart,
  getWishlist,
  addToWishlist,
  editWishlist,
  removeItemFromWishlist,
  createOrder,
  getOrders,
  getProducts
}

export * from './user'
