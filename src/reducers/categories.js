import { RECEIVE_CATEGORIES } from '../actions/categories'

export default function categories(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
      }
    default: return state
  }
}
