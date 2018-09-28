import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
// conpoments
import Home from '../components/Home'
import Header from '../components/Header'
import Add from '../components/Add'
import PageNotFound from '../components/PageNotFound'
import Modal from '../components/Modal'
import Question from '../components/Question'

// API
import * as api from '../utils/_api'


class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
  }
  render() {
    api.getCategories()// fetchind the data from remote server
      .then(response => console.log(response))

    api.getPost()
      .then((c) => {
        console.log(c)
      })

    // const newComment = {
      // id: '894tuq4ut84ut8v4t8wun89g',
      // parentId: '8xf0y6ziyjabvozdd253nd',
      // timestamp: 1468166872634,
      // body: 'Hi there! I am a COMMENT.',
      // author: 'thingtwo',
      // voteScore: 6,
      // deleted: false,
      // parentDeleted: false,
    // }
    // api.add(newComment)
      // .then((c, e) => {
    // console.log(c, e)
      // })
      // .catch(err => console.log(err))

    // export function getInitialData() {
      // return Promise.all([
    // getCategories(),
    // getPost(),
      // ]).then(([users, questions]) => ({
    // users,
    // questions,
      // }))
    // }

    api.getInitialData()
      .then(res => console.log(res))

    return (
      <Router basename="">
        <Fragment>
          <Header />
          <Switch>
            <Route component={Home} exact path="/" />
          </Switch>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps(state, props) {
  // console.log(template.color, template.background)
  return {
    state,
  }
}
export default connect(mapStateToProps)(App)
