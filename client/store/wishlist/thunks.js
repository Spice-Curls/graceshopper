import axios from 'axios'
import {
  _addToWishlist,
  _getWishlist,
  _editWishlist,
  _removeItemFromWishlist
} from './actions'

export const addToWishlist = product => async dispatch => {
  const localStorage = JSON.parse(window.localStorage.getItem('wishlist'))
  const productWishlist = (await axios.post(`/api/wishlistItems`, {
    product,
    localStorage
  })).data
  if (!productWishlist.buyerId) {
    if (!localStorage) {
      window.localStorage.setItem('wishlist', JSON.stringify([productWishlist]))
    } else {
      const dupe = localStorage.find(item => item.productId === product.id)
      if (dupe) {
        const newStorage = localStorage.map(
          item =>
            item.productId === productWishlist.productId
              ? productWishlist
              : item
        )
        window.localStorage.setItem('wishlist', JSON.stringify(newStorage))
      } else {
        localStorage.push(productWishlist)
        window.localStorage.setItem('wishlist', JSON.stringify(localStorage))
      }
    }
  }
  dispatch(_addToWishlist(productWishlist))
}

export const getWishlist = buyerId => {
  return async dispatch => {
    const wishlist = (await axios.get(`/api/wishlistItems/${buyerId}`)).data
    dispatch(_getWishlist(wishlist))
  }
}

export const editWishlist = (quantity, item) => {
  return async dispatch => {
    if (item.buyerId) {
      const edited = (await axios.put(
        `api/wishlistItems/${item.buyerId}/${item.id}`,
        {
          quantity
        }
      )).data
      dispatch(_editWishlist(edited))
    } else {
      const entireWishlist = JSON.parse(window.localStorage.getItem('wishilst'))
      const myItem = entireWishlist.find(
        wishlistItem => wishlistItem.id === item.id
      )
      myItem.quantity = quantity * 1
      window.localStorage.setItem('wishlist', JSON.stringify(entireWishlist))
      dispatch(_editWishlist(myItem))
    }
  }
}

export const removeItemFromWishlist = item => {
  return async dispatch => {
    if (item.buyerId) {
      await axios.delete(`/api/wishlistItems/${item.buyerId}/${item.id}`)
    } else {
      const wishlist = JSON.parse(
        window.localStorage.getItem('wishlist')
      ).filter(wishlistItem => wishlistItem.id !== item.id)
      window.localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }
    dispatch(_removeItemFromWishlist(item))
  }
}
