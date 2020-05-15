import {
  GET_WISHLIST,
  ADD_TO_WISHLIST,
  EDIT_WISHLIST,
  REMOVE_ITEM_FROM_WISHLIST
} from '../constants'

const wishlistReducer = (state = [], action) => {
  switch (action.type) {
    case GET_WISHLIST:
      state = [...action.wishlistItems]
      break
    case ADD_TO_WISHLIST:
      if (
        state.filter(item => item.id === action.wishlistItem.id).length !== 0
      ) {
        state = state.map(
          item =>
            item.id === action.wishlistItem.id ? action.wishlistItem : item
        )
      } else {
        state = [...state, action.wishlistItem]
      }
      break
    case EDIT_WISHLIST:
      state = state.map(
        item => (item.id === action.item.id ? action.item : item)
      )
      break
    case REMOVE_ITEM_FROM_WISHLIST:
      state = state.filter(item => item.id !== action.item.id)
      break
  }
  return state
}
export default wishlistReducer
