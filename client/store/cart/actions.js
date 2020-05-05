import {ADD_TO_CART} from '../constants'

export const _addToCart = cart => {
  return {
    type: ADD_TO_CART,
    cart
  }
}
