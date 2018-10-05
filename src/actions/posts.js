export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SCORE_INCREMENT_POSTS = 'SCORE_INCREMENT_POSTS'
export const SCORE_DECREMENT_POSTS = 'SCORE_DECREMENT_POSTS'

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}
export function incrementPosts(vote, idPost, displayPosts) {
  return {
    type: SCORE_INCREMENT_POSTS,
    vote,
    idPost,
    displayPosts,
  }
}
export function decrementPosts(vote, idPost, displayPosts) {
  return {
    type: SCORE_DECREMENT_POSTS,
    vote,
    idPost,
    displayPosts,
  }
}
