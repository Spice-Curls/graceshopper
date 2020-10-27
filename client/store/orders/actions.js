import {CREATE_ORDER, GET_ORDERS} from '../constants'

export const _createOrder = order => {
  return {
    type: CREATE_ORDER,
    order
  }
}

export const _getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}
