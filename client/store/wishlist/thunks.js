import axios from 'axios'
import {_getWishlist, _addToWishlist} from './actions'

export const getWishlist = buyerId => async dispatch => {
  const products = (await axios.get(`/api/wishlists/${buyerId}`)).data
  dispatch(_getWishlist(products))
}

export const addToWishlist = product => async dispatch => {
  const wishlistProduct = (await axios.post(`/api/wishlistItems`, {product}))
    .data
  dispatch(_addToWishlist(wishlistProduct))
}
