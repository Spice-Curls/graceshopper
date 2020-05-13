import axios from 'axios'

export const createOrder = order => {
  return async dispatch => {
    const newOrder = (await axios.post(`/api/orders/${order.userId}`, {order}))
      .data
    console.log(newOrder)
  }
}
