import axios from 'axios'
import {_addToCart, _getCart} from './actions'

export const addToCart = product => async dispatch => {
  const productCart = (await axios.post(`/api/cartItems`, {product})).data
  dispatch(_addToCart(productCart))
}

export const getCart = buyerId => {
  return async dispatch => {
    const cart = (await axios.get(`/api/cartItems/${buyerId}`)).data
    dispatch(_getCart(cart))
  }
}
