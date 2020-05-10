import {CREATE_ORDER} from '../constants'

const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_ORDER:
      state = action.order
      break
  }
  return state
}

export default ordersReducer
