import {GET_USER_PRODUCTS} from '../constants'

const userProductsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_PRODUCTS:
      state = action.products
      break
  }
  return state
}

export default userProductsReducer
