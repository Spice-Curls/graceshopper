import {GET_USER_PRODUCTS, ADD_PRODUCT} from '../constants'

const userProductsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_PRODUCTS:
      state = action.products
      break
    case ADD_PRODUCT:
      state = [...state, action.product]
      break
  }
  return state
}

export default userProductsReducer
