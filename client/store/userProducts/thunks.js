import axios from 'axios'
import {_getUserProducts} from './actions'

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
