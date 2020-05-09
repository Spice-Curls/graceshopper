import {ADD_TO_WISHLIST, GET_WISHLIST} from '../constants'

export const _addToWishlist = product => {
  return {
    type: ADD_TO_WISHLIST,
    product
  }
}

export const _getWishlist = product => {
  return {
    type: GET_WISHLIST,
    product
  }
}
