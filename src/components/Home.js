import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
// import { formatDate } from '../utils/helpers'
import Posts from './Posts'
// import PropTypes from 'prop-types'
// import pullAll from 'lodash/pullAll'

class Home extends Component {
  static propTypes = {
  }
  state = {
    sortedVoted: null,
  }
  date = (postSorted) => {
    console.log(postSorted)
    const t = _.sortBy(postSorted, postSorted.timestamp)
    console.log(t)
  }
  voteScore = (postSorted) => {
    console.log(postSorted)
  }
  newPost = (postSorted) => {
    console.log(postSorted)
  }
  render() {
    const { posts } = this.props
    const postSorted = posts
    return (
      <div className="Home row justify-content-center flex-column">
        <div className="">
          <p className="text-danger">should list all of the posts</p>
          <p className="text-danger">should have a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp
          </p>
          <p className="text-danger">should have a control for adding a new post</p>
        </div>
        <h1 className="col m-4 align-center" >
            All the post
        </h1>
        <div className="col m-4">
          <button onClick={() => this.date(postSorted)}>
            Date
          </button>
          <button onClick={() => this.voteScore(postSorted)} >
            sort by vote score
          </button>
          <button onClick={() => this.newPost(postSorted)} >
            add new post
          </button>
        </div>
        <div className="flex-column col m-4 w-50 align-items-center">
          <Posts
            posts={posts}
            sortedVoted={this.state.sortedVoted}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ categories, posts }) {
  // console.log(posts)
  const arrPosts = Object.values(posts)
  // console.log(arrPosts)
  const sortedTimestamp = _.sortBy(arrPosts, arrPosts.timestamp)
  return {
    posts: sortedTimestamp,
  }
}
export default connect(mapStateToProps)(Home)

