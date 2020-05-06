import {ADD_TO_CART} from '../constants'

const cartReducer = (state = [], action) => {
  console.log('hello')
  switch (action.type) {
    case ADD_TO_CART:
      console.log('REDUCER!!!', state, action.cart)
      return [...state, action.cart]
  }
  return state
}
export default cartReducer
