import {
  GET_USER_PRODUCTS,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DESTROY_PRODUCT
} from '../constants'

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

export const _editProduct = product => {
  return {
    type: EDIT_PRODUCT,
    product
  }
}

export const _destroyProduct = product => {
  return {
    type: DESTROY_PRODUCT,
    product
  }
}
