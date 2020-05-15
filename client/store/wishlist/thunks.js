import axios from 'axios'
import {
  _addToWishlist,
  _getWishlist,
  _editWishlist,
  _removeItemFromWishlist
} from './actions'

export const addToWishlist = product => async dispatch => {
  const productWishlist = (await axios.post(`/api/wishlistItems`, {product}))
    .data
  dispatch(_addToWishlist(productWishlist))
}

export const getWishlist = buyerId => {
  return async dispatch => {
    const wishlist = (await axios.get(`/api/wishlistItems/${buyerId}`)).data
    dispatch(_getWishlist(wishlist))
  }
}

export const editWishlist = (quantity, item) => {
  return async dispatch => {
    const editted = (await axios.put(
      `api/wishlistItems/${item.buyerId}/${item.id}`,
      {
        quantity
      }
    )).data
    dispatch(_editWishlist(editted))
  }
}

export const removeItemFromWishlist = item => {
  return async dispatch => {
    await axios.delete(`/api/wishlistItems/${item.buyerId}/${item.id}`)
    dispatch(_removeItemFromWishlist(item))
  }
}
