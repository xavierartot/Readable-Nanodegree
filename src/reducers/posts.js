import {
  RECEIVE_POSTS,
  SCORE_INCREMENT_POSTS,
  SCORE_DECREMENT_POSTS,
  NEW_POST,
  DELETE_POST,
  EDIT_POST,
} from '../actions/posts'
// import update from 'immutability-helper'
import reject from 'lodash/reject'

export default function receivePosts(state = {}, action) {
  const { idPost, displayPosts } = action// declaration to increment and decrement
  const newState = state// declaration to increment and decrement
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts,
      }
    case SCORE_INCREMENT_POSTS:
      // lodash return a new collection with the update object
      // I'm deleting the object
      const rejectsIncrement = reject(newState, o => o.id === idPost)
      // increment the new vote
      displayPosts.voteScore++
      const updateVote = [
        ...rejectsIncrement,
        displayPosts,
      ]
      state = Object.assign({}, updateVote)
      return state
    case SCORE_DECREMENT_POSTS:
      // see the comment above
      const rejectsDecrement = reject(newState, o => o.id === idPost)
      displayPosts.voteScore--
      const updateVoteDecrement = [
        ...rejectsDecrement,
        displayPosts,
      ]
      state = Object.assign({}, updateVoteDecrement)
      return state
    case NEW_POST:
      const size = Object.keys(state).length
      state = {
        ...state,
        [size]: Object.assign({}, action.post),
      }
      return state
    case DELETE_POST:
      const rejects = reject(state, o => o.id === action.id)
      console.log(rejects)
      state = rejects
      return state
    case EDIT_POST:
      console.log(state, action.id)
      return state
    default: return state
  }
}
