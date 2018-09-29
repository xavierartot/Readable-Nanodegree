import { RECEIVE_CATEGORIES } from '../actions/categories'

export default function categories(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      console.log(action)
      return {
        ...state,
        ...action.categories,
      }
    default: return state
  }
}
