import {
  RECEIVE_POSTS,
  SCORE_INCREMENT_POSTS,
  SCORE_DECREMENT_POSTS,
} from '../actions/posts'
import update from 'immutability-helper'
import reject from 'lodash/reject'

export default function receivePosts(state = {}, action) {
  const { vote, idPost, displayPosts } = action
  const newState = state
  let clone
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
      // console.log(reject)
      // increment the new vote
      displayPosts.voteScore++
      const updateVote = [
        ...rejectsIncrement,
        displayPosts,
      ]
      clone = Object.assign({}, updateVote)
      state = clone
      return state
    case SCORE_DECREMENT_POSTS:
      const rejectsDecrement = reject(newState, o => o.id === idPost)
      console.log(rejectsDecrement)
      console.log(displayPosts)
      console.log(displayPosts.voteScore -= 1)
      // displayPosts.voteScore--
      const updateVoteDecrement = [
        ...rejectsDecrement,
        displayPosts,
      ]
      clone = Object.assign({}, updateVoteDecrement)
      state = clone
      return state
    default: return state
  }
}
