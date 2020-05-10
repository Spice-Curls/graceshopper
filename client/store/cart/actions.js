import {GET_CART, ADD_TO_CART} from '../constants'

export const _getCart = cartItems => {
  return {
    type: GET_CART,
    cartItems
  }
}

export const _addToCart = cartItem => {
  return {
    type: ADD_TO_CART,
    cartItem
  }
}
