export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENTS = 'ADD_COMMENTS'

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
