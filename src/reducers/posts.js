import { RECEIVE_POSTS } from '../actions/posts'

export default function receivePosts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
      }
    default: return state
  }
}
