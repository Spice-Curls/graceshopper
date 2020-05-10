import {CREATE_ORDER} from '../constants'

export const _createOrder = order => {
  return {
    type: CREATE_ORDER,
    order
  }
}
