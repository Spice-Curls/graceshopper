import {GET_PRODUCTS} from '../constants'

export const _getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}
