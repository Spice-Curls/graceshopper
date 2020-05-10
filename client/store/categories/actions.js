import {GET_CATEGORIES} from '../constants'

export const _getCategories = categories => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}
