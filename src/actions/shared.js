import { receiveCategories } from './categories'
import { deleteComment, incrementComment, decrementComment, receiveCommentsById } from './comments'
import { decrementPosts, incrementPosts, editPost, receivePosts, deletePost, newPost } from './posts'
// API
import { deleteCommentApi, incrementDecrementComment, incrementDecrementPost, getCommentById, editPostApi, addNewPost, getInitialData, deletePostApi } from '../utils/_api'

export function handleInitialData() { // middleware thunk
  return (dispatch, getState) => { // thunk pattern with redux-thunk
    getInitialData() // return a promise
      .then(({ categories, posts }) => {
        // dispatch(showLoading()) // show the loading bar
        // promise which will pass to us an object with users and questions properties
        // let's add users, questions to the redux store
        dispatch(receiveCategories(categories))
        // dispatch(setAuthedUser(null)) // null by default
        dispatch(receivePosts(posts))
        // dispatch(hideLoading()) // hide the loading bar
      })
  }
}
export function handleDeletePost(id) {
  return (dispatch, getState) => { // thunk pattern with redux-thunk
    dispatch(deletePost(id))
    deletePostApi(id)// api
  }
}
export function handleAddPost(post) {
  return (dispatch, getState) => { // thunk pattern with redux-thunk
    dispatch(newPost(post))
    addNewPost(post)// api
  }
}
export function handleEditPost(post) {
  return (dispatch, getState) => { // thunk pattern with redux-thunk
    dispatch(editPost(post))
    editPostApi(post)
  }
}
export function handleCommentById(id) {
  return (dispatch, getState) => { // thunk pattern with redux-thunk
    getCommentById(id).then(res =>
      dispatch(receiveCommentsById(res)))
  }
}
export function handleIncrementPost(id, post) {
  return (dispatch, getState) => { // thunk pattern with redux-thunk
    dispatch(incrementPosts(id, post))
    incrementDecrementPost(post)// api
  }
}
export function handleDecrementPost(id, post) {
  return (dispatch, getState) => { // thunk pattern with redux-thunk
    dispatch(decrementPosts(id, post))
    incrementDecrementPost(post)// api
  }
}
export function handleDecrementComment(id, comment) {
  return (dispatch, getState) => { // thunk pattern with redux-thunk
    dispatch(decrementComment(id, comment))
    incrementDecrementComment(comment)// api
  }
}
export function handleIncrementComment(id, comment) {
  return (dispatch, getState) => { // thunk pattern with redux-thunk
    dispatch(incrementComment(id, comment))
    incrementDecrementComment(comment)// api
  }
}

export function handleDeleteComment(comment) {
  return (dispatch, getState) => { // thunk pattern with redux-thunk
    dispatch(deleteComment(comment))
    deleteCommentApi(comment)
  }
}
