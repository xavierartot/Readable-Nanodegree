import {
  RECEIVE_POSTS,
  SCORE_INCREMENT_POSTS,
  SCORE_DECREMENT_POSTS,
} from '../actions/posts'
import update from 'immutability-helper'
import _ from 'lodash'

export default function receivePosts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts,
      }
    case SCORE_INCREMENT_POSTS:
      const { vote, idPost, displayPosts } = action
      const newState = state
      // lodash return a new collection without the update object
      // I'm deleting the post I want to update
      const reject = _.reject(newState, o => o.id === idPost)
      // console.log(reject)
      // increment the new vote
      displayPosts.voteScore++
      console.log(displayPosts)
      const updateVote = [
        ...reject,
        displayPosts,
      ]
      console.log(updateVote)
      state = updateVote
      return state
    case SCORE_DECREMENT_POSTS:
      console.log(action.posts)
      console.log(action)
      return {
        ...state,
        ...action.posts,
      }
    default: return state
  }
}
