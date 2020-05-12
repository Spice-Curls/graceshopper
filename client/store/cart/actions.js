import {GET_CART, ADD_TO_CART, EDIT_CART} from '../constants'

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

export const _editCart = item => {
  return {
    type: EDIT_CART,
    item
  }
}
