export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SCORE_INCREMENT_POSTS = 'SCORE_INCREMENT_POSTS'
export const SCORE_DECREMENT_POSTS = 'SCORE_DECREMENT_POSTS'
export const NEW_POST = 'NEW_POST'
export const DELETE_POST = 'DELETE_POST'

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}
export function incrementPosts(idPost, displayPosts) {
  return {
    type: SCORE_INCREMENT_POSTS,
    idPost,
    displayPosts,
  }
}
export function decrementPosts(idPost, displayPosts) {
  return {
    type: SCORE_DECREMENT_POSTS,
    idPost,
    displayPosts,
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
