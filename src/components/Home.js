import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
// import { formatDate } from '../utils/helpers'
import Posts from './Posts'
// import PropTypes from 'prop-types'
// import pullAll from 'lodash/pullAll'
import { IoMdArrowUp, IoMdArrowDown } from 'react-icons/io'
// import { MdPlaylistAddCheck } from 'react-icons/md'

class Home extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
  }
  state = {
    sortedVoted: null,
    toggleDate: true,
    toggleScore: true,
    redirect: null,
  }
  date = (postSorted) => {
    const sort = _.sortBy(postSorted, postSorted.timestamp)
    this.state.toggleDate === true
      ? this.setState(() => ({
        sortedVoted: sort,
        toggleDate: false,
      }))
      : this.setState(() => ({
        sortedVoted: sort.reverse(),
        toggleDate: true,
      }))
  }
  voteScore = (postSorted) => {
    const sort = _.sortBy(postSorted, postSorted.voteScore)
    this.state.toggleScore === true
      ? this.setState(() => ({
        sortedVoted: sort,
        toggleScore: false,
      }))
      : this.setState(() => ({
        sortedVoted: sort.reverse(),
        toggleScore: true,
      }))
  }
  newPost = (postSorted) => {
    if (postSorted) {
      this.setState(() => ({
        redirect: true,
      }))
    }
  }

  // posts[post.id] = {
  // id: post.id,
  // timestamp: post.timestamp,
  // title: post.title,
  // body: post.body,
  // author: post.author,
  // category: post.category,
  // voteScore: 1,
  // deleted: false,
  // commentCount: 0,
  // }

  render() {
    const { posts } = this.props
    const postSorted = posts
    if (this.state.redirect) {
      return <Redirect to="/newpost" />
    }
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
            Sort Date { this.state.toggleDate === true ? <IoMdArrowUp /> : <IoMdArrowDown />}
          </button>
          <button onClick={() => this.voteScore(postSorted)} >
            Sort Score { this.state.toggleScore ? <IoMdArrowUp /> : <IoMdArrowDown />}
          </button>
          <button onClick={() => this.newPost(postSorted)} >
            Add New Post
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
  const arrPosts = Object.values(posts)
  const sortedTimestamp = _.sortBy(arrPosts, arrPosts.timestamp)
  return {
    posts: sortedTimestamp,
  }
}
export default withRouter(connect(mapStateToProps)(Home))

