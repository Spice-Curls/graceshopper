import {GET_USER_PRODUCTS, ADD_PRODUCT} from '../constants'

export const _getUserProducts = products => {
  return {
    type: GET_USER_PRODUCTS,
    products
  }
}

export const _addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}
