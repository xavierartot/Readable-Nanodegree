import thunk from 'redux-thunk'
import posts from './posts'
import { categoriesAction } from './categories'
import { receivePosts } from './posts'

// API
import { getInitialData } from '../utils/_api'

const VAR = 'dd'
export function handleInitialData() { // middleware thunk
  return (dispatch, getState) => { // thunk pattern with redux-thunk
    getInitialData() // return a promise
      .then(({ categories, posts }) => {
        console.log(categories)
        // dispatch(showLoading()) // show the loading bar
        // promise which will pass to us an object with users and questions properties
        // let's add users, questions to the redux store
        dispatch(categoriesAction(categories))
        // dispatch(setAuthedUser(null)) // null by default
        dispatch(receivePosts(posts))
        // dispatch(hideLoading()) // hide the loading bar
      })
  }
}
