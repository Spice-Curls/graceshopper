import axios from 'axios'
import {_getCategories} from './actions'

export const getCategories = () => {
  return async dispatch => {
    const categories = (await axios.get('/api/categories')).data
    dispatch(_getCategories(categories))
  }
}
