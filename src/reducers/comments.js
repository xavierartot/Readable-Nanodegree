import { UPDATE_COMMENT, ADD_COMMENT, DELETE_COMMENTS, DECREMENT_COMMENTS, INCREMENT_COMMENTS, RECEIVE_COMMENTS } from '../actions/comments'
import reject from 'lodash/reject'
import { generateUID } from '../utils/helpers'

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
      return state
    case ADD_COMMENT:
      const size = Object.keys(state).length
      console.log(comment, action.post)
      const commentObj = {
        ...comment,
        deleted: false,
        id: generateUID(),
        parentDeleted: false,
        parentId: action.post.id,
        timestamp: Date.now(),
        voteScore: 0,
      }
      return {
        ...state,
        [size]: Object.assign({}, commentObj),
      }
    case UPDATE_COMMENT:
      // console.log(action)
      const rejectsComment = reject(state, o => o.id === comment.id)
      console.log(action.id, comment, rejectsComment)
      const commentUpdateObj = {
        ...comment,
        deleted: false,
        id: generateUID(),
        parentDeleted: false,
        parentId: action.id,
        timestamp: Date.now(),
        voteScore: 0,
      }
      const updateComment = [
        ...rejectsComment,
        commentUpdateObj,
      ]
      console.log(updateComment)
      state = Object.assign({}, updateComment)
      console.log(state)
      return {
        updateComment,
      }
    default: return state
  }
}
