import { receiveCategories } from './categories'
import { editPost, receivePosts, deletePost, newPost } from './posts'
// API
import { editPostApi, addNewPost, getInitialData, deletePostApi } from '../utils/_api'

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
    deletePostApi(id)
  }
}
export function handleAddPost(post) {
  return (dispatch, getState) => { // thunk pattern with redux-thunk
    dispatch(newPost(post))
    addNewPost(post)
  }
}
export function handleEditPost(post) {
  return (dispatch, getState) => { // thunk pattern with redux-thunk
    dispatch(editPost(post))
    editPostApi(post)
  }
}
