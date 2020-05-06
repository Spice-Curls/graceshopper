import {GET_CART, ADD_TO_CART} from '../constants'

export const _getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

export const _addToCart = cart => {
  return {
    type: ADD_TO_CART,
    cart
  }
}
