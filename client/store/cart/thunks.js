import axios from 'axios'
import {_addToCart, _getCart, _editCart, _removeItemFromCart} from './actions'

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

export const editCart = (quantity, item) => {
  return async dispatch => {
    const editted = (await axios.put(
      `api/cartItems/${item.buyerId}/${item.id}`,
      {quantity}
    )).data
    dispatch(_editCart(editted))
  }
}

export const removeItemFromCart = item => {
  return async dispatch => {
    await axios.delete(`/api/cartItems/${item.buyerId}/${item.id}`)
    dispatch(_removeItemFromCart(item))
  }
}
