import {GET_CATEGORIES} from '../constants'

const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      state = action.categories
      break
  }
  return state
}

export default categoriesReducer
