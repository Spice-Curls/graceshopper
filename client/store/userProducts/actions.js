import {GET_USER_PRODUCTS} from '../constants'

export const _getUserProducts = products => {
  console.log(products)
  return {
    type: GET_USER_PRODUCTS,
    products
  }
}
