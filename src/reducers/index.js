import { combineReducers } from 'redux'
import template from './template'
import posts from './posts'
import categories from './categories'

export default combineReducers({
  posts,
  categories,
  // loadingBar: loadingBarReducer, // react-redux-loading
})
