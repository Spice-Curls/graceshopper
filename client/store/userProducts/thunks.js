import axios from 'axios'

import {
  _getUserProducts,
  _addProduct,
  _editProduct,
  _destroyProduct
} from './actions'

export const getUserProducts = userId => {
  return async dispatch => {
    const products = (await axios.get(`/api/products/${userId}`)).data
    dispatch(_getUserProducts(products))
  }
}

export const addProduct = (_product, formData, userId) => {
  return async dispatch => {
    const product = (await axios.post(
      `/api/products/${userId}`,
      formData,
      _product
    )).data
    dispatch(_addProduct(product))
  }
}

export const editProduct = (product, amount) => {
  return async dispatch => {
    const editted = (await axios.put(`/api/products/${product.id}`, {amount}))
      .data
    dispatch(_editProduct(editted))
  }
}

export const removeProduct = product => {
  return async dispatch => {
    await axios.delete(`/api/products/${product.id}`)
    dispatch(_destroyProduct(product))
  }
}
