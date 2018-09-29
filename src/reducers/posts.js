import { RECEIVE_POSTS } from '../actions/posts'

export default function receivePosts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      // console.log(action.posts)
      return {
        ...state,
        ...action.posts,
      }
    default: return state
  }
}
