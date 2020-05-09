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
import {_getUserProducts, _addProduct} from './userProducts/actions'
import {getUserProducts, addProduct} from './userProducts/thunks'

//cart
import cartReducer from './cart/reducer'
import {_getCart, _addToCart} from './cart/actions'
import {addToCart, getCart} from './cart/thunks'

//categories
import categoriesReducer from './categories/reducer'
import {_getCategories} from './categories/actions'
import {getCategories} from './categories/thunks'

const reducer = combineReducers({
  user,
  cart: cartReducer,
  categories: categoriesReducer,
  userProducts: userProductsReducer,
  wishlists: wishlistReducer
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
  addToWishlist
}

export * from './user'
