import {
  GET_WISHLIST,
  ADD_TO_WISHLIST,
  EDIT_WISHLIST,
  REMOVE_ITEM_FROM_WISHLIST
} from '../constants'

export const _getWishlist = wishlistItems => {
  return {
    type: GET_WISHLIST,
    wishlistItems
  }
}

export const _addToWishlist = wishlistItem => {
  return {
    type: ADD_TO_WISHLIST,
    wishlistItem
  }
}

export const _editWishlist = item => {
  return {
    type: EDIT_WISHLIST,
    item
  }
}

export const _removeItemFromWishlist = item => {
  return {
    type: REMOVE_ITEM_FROM_WISHLIST,
    item
  }
}
