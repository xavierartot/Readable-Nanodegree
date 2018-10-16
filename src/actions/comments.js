export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENTS = 'ADD_COMMENTS'
export const INCREMENT_COMMENTS = 'INCREMENT_COMMENTS'
export const DECREMENT_COMMENTS = 'DECREMENT_COMMENTS'
export const DELETE_COMMENTS = 'DELETE_COMMENTS'

export function receiveCommentsById(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  }
}
export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    comments,
  }
}
export function decrementComment(id, comment) {
  return {
    type: DECREMENT_COMMENTS,
    comment,
    id,
  }
}
export function incrementComment(id, comment) {
  return {
    type: INCREMENT_COMMENTS,
    comment,
    id,
  }
}
export function deleteComment(comment) {
  return {
    type: DELETE_COMMENTS,
    comment,
  }
}
