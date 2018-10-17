import { DELETE_COMMENTS, DECREMENT_COMMENTS, INCREMENT_COMMENTS, RECEIVE_COMMENTS } from '../actions/comments'
import reject from 'lodash/reject'

export default function comments(state = {}, action) {
  const { id, comment } = action// declaration to increment and decrement
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        ...action.comments,
      }
    case INCREMENT_COMMENTS:
      // // lodash return a new collection with the update object
      // // I'm deleting the object
      const rejectsIncrement = reject(state, o => o.id === id)
      comment.voteScore++
      const updateVote = [
        ...rejectsIncrement,
        comment,
      ]
      state = Object.assign({}, updateVote)
      return state
    case DECREMENT_COMMENTS:
      const rejectsDecrement = reject(state, o => o.id === id)
      comment.voteScore--
      const updateVoteDecrement = [
        ...rejectsDecrement,
        comment,
      ]
      state = Object.assign({}, updateVoteDecrement)
      return state
    case DELETE_COMMENTS:
      const rejectsDeleted = reject(state, o => o.id === comment.id)
      const c = { ...comment, deleted: true }
      const updateDelete = [
        ...rejectsDeleted,
        c,
      ]
      state = Object.assign({}, updateDelete)
      console.log(state)
      return state
    default: return state
  }
}
