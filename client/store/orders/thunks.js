import axios from 'axios'
import {_createOrder} from './actions'

export const createOrder = order => {
  return async dispatch => {
    const newOrder = (await axios.post(`/api/orders/${order.userId}`, {order}))
      .data
    dispatch(_createOrder(newOrder))
  }
}
