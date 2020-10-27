import axios from 'axios'

import {_getProducts} from './actions'

export const getProducts = () => {
  return async dispatch => {
    const products = (await axios.get(`/api/products`)).data
    dispatch(_getProducts(products))
  }
}
