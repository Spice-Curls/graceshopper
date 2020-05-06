import {ADD_TO_WISHLIST} from '../constants'

const wishlistReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return [...state, action.wishlist]
  }
  return state
}
export default wishlistReducer
