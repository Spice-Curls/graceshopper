import {CREATE_ORDER, GET_ORDERS} from '../constants'

const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      state = action.orders
      break
    case CREATE_ORDER:
      state = [...state, action.order]
      break
  }
  return state
}

export default ordersReducer
