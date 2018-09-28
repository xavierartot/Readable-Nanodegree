import { CHANGE_TEMPLATE } from '../actions/template'

export default function template(state = {}, action) {
  switch (action.type) {
    case CHANGE_TEMPLATE:
      const { color } = action
      return {
        ...state,
        color: color.color,
        background: color.background,
      }
    default: return state
  }
}
