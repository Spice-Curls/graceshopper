import {GET_PRODUCTS} from '../constants'

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      state = action.products
      break
  }
  return state
}

export default productsReducer
