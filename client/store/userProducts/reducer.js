import {
  GET_USER_PRODUCTS,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DESTROY_PRODUCT
} from '../constants'

const userProductsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_PRODUCTS:
      state = action.products
      break
    case ADD_PRODUCT:
      state = [...state, action.product]
      break
    case EDIT_PRODUCT:
      state = state.map(
        product => (product.id === action.product.id ? action.product : product)
      )
      break
    case DESTROY_PRODUCT:
      state = state.filter(product => product.id !== action.product.id)
      break
  }
  return state
}

export default userProductsReducer
