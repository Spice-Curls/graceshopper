import {GET_USER_PRODUCTS} from '../constants'

export const _getUserProducts = products => {
  return {
    type: GET_USER_PRODUCTS,
    products
  }
}
