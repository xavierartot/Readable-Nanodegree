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
      console.log(state, vote, idPost, displayPosts)
      for (let i = 0, len = state.length; i < len; i++) {
        console.log(1)
      }
      // [...post, right: 'blue']
      // newState.map(post => post)

      // const newS = update(state, {
      // a: {
      // c: { $set: 'new value' },
      // },
      // })

      const updateVote = {
        ...state,
        // [postSingle]: {
        // voteScore: action.vote++,
        // },
      }
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
