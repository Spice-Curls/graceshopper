import {ADD_TO_WISHLIST} from '../constants'

export const _addToWishlist = wishlist => {
  return {
    type: ADD_TO_WISHLIST,
    wishlist
  }
}
