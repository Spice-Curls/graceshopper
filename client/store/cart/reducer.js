import {ADD_TO_CART} from '../constants'

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      state = action.cart
      return state
  }
  return state
}
export default cartReducer
