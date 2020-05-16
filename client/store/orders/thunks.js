import axios from 'axios'
import {_createOrder, _getOrders} from './actions'

export const createOrder = order => {
  return async dispatch => {
    const newOrder = (await axios.post(`/api/orders/${order.userId}`, {order}))
      .data
    dispatch(_createOrder(newOrder))
  }
}

export const getOrders = id => {
  return async dispatch => {
    const orders = (await axios.get(`/api/orders/${id}`)).data
    dispatch(_getOrders(orders))
  }
}
