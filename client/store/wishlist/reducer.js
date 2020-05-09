import {ADD_TO_WISHLIST, GET_WISHLIST} from '../constants'

const initialState = {
  wishlistItems: []
}

const wishlistReducer = (state = initialState.wishlistItems, action) => {
  switch (action.type) {
    case GET_WISHLIST:
      state = action.product
      break
    case ADD_TO_WISHLIST:
      state = [action.product]
      break
  }
  return state
}
export default wishlistReducer
