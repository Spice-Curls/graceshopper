import {GET_CART, ADD_TO_CART} from '../constants'

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      state = action.cartItems
      break
    case ADD_TO_CART:
      state = [...state, action.cartItem]
      break
  }
  return state
}
export default cartReducer
