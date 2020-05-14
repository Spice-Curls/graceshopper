import axios from 'axios'
import {_addToCart, _getCart, _editCart, _copyCart} from './actions'

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

export const copyCart = () => {
  return dispatch => {
    const cart = JSON.parse(window.localStorage.getItem('cart'))
    dispatch(_copyCart(cart))
  }
}
