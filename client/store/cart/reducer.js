import {GET_CART, ADD_TO_CART} from '../constants'

const initialState = {
  cartItems: []
}
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return [...state.cartItems, action.cart]
  }
  return state
}
export default cartReducer
