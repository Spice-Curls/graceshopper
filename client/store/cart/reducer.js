import {GET_CART, ADD_TO_CART, EDIT_CART, COPY_CART} from '../constants'

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      state = [...action.cartItems]
      break
    case ADD_TO_CART:
      //if the item is already in the cart
      if (state.filter(item => item.id === action.cartItem.id).length !== 0) {
        state = state.map(
          item => (item.id === action.cartItem.id ? action.cartItem : item)
        )
      } else {
        state = [...state, action.cartItem]
      }
      break
    case EDIT_CART:
      state = state.map(
        item => (item.id === action.item.id ? action.item : item)
      )
      break
    case COPY_CART:
      state = [...action.cartItems]
      break
  }
  return state
}
export default cartReducer
