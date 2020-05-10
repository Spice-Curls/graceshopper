import {GET_CART, ADD_TO_CART} from '../constants'

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      state = action.cart
      break
    case ADD_TO_CART:
      // const newCart = [...state];
      // newCart.push(action.cart);
      // state = newCart;
      state = [action.cart]
      break
  }
  return state
}
export default cartReducer
