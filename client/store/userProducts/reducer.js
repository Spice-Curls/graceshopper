import {GET_USER_PRODUCTS} from '../constants'

const userProductsReducer = (state = [], action) => {
  console.log('userProducts', action)
  switch (action.type) {
    case GET_USER_PRODUCTS:
      console.log('hello')
      state = action.products
      break
  }
  return state
}

export default userProductsReducer
