import axios from 'axios'
import {_addToCart, _getCart, _editCart, _removeItemFromCart} from './actions'

export const addToCart = product => async dispatch => {
  const localStorage = JSON.parse(window.localStorage.getItem('cart'))
  const productCart = (await axios.post(`/api/cartItems`, {
    product,
    localStorage
  })).data
  if (!productCart.buyerId) {
    if (!localStorage) {
      window.localStorage.setItem('cart', JSON.stringify([productCart]))
    } else {
      const dupe = localStorage.find(item => item.productId === product.id)
      if (dupe) {
        const newStorage = localStorage.map(
          item =>
            item.productId === productCart.productId ? productCart : item
        )
        window.localStorage.setItem('cart', JSON.stringify(newStorage))
      } else {
        localStorage.push(productCart)
        window.localStorage.setItem('cart', JSON.stringify(localStorage))
      }
    }
  }
  dispatch(_addToCart(productCart))
}

export const getCart = buyerId => {
  return async dispatch => {
    if (buyerId) {
      const cart = (await axios.get(`/api/cartItems/${buyerId}`)).data
      dispatch(_getCart(cart))
    }
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
