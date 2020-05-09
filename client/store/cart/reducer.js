import {GET_CART, ADD_TO_CART} from '../constants'

const initialState = {
  cartItems: []
}
const cartReducer = (state = initialState.cartItems, action) => {
  switch (action.type) {
    case GET_CART:
      state = action.cart
      break
    case ADD_TO_CART:
      state = [action.cart]
      break
  }
  return state
}
export default cartReducer
