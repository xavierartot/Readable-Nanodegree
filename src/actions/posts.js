export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SCORE_INCREMENT_POSTS = 'SCORE_INCREMENT_POSTS'
export const SCORE_DECREMENT_POSTS = 'SCORE_DECREMENT_POSTS'
export const NEW_POST = 'NEW_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const UDPATE_COMMENT_POST = 'UDPATE_COMMENT_POST'
export const ADD_COMMENT_POST = 'ADD_COMMENT_POST'
export const ADD_COMMENTS = 'ADD_COMMENTS'

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}
export function incrementPosts(idPost, post) {
  return {
    type: SCORE_INCREMENT_POSTS,
    idPost,
    post,
  }
}
export function decrementPosts(idPost, post) {
  return {
    type: SCORE_DECREMENT_POSTS,
    idPost,
    post,
  }
}
export function newPost(post) {
  return {
    type: NEW_POST,
    post,
  }
}
export function deletePost(id) {
  return {
    type: DELETE_POST,
    id,
  }
}
export function editPost(post) {
  return {
    type: EDIT_POST,
    post,
  }
}

export function removeCommentPost(post) {
  return {
    type: UDPATE_COMMENT_POST,
    post,
  }
}
export function addCommentPost(post) {
  return {
    type: ADD_COMMENT_POST,
    post,
  }
}

