import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'
import { Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { newPost } from '../actions/posts'

// components
import Posts from './Posts'
// import pullAll from 'lodash/pullAll'

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
  sortDate = (postSorted) => {
    const sort = sortBy(postSorted, postSorted.timestamp)
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
    const sort = sortBy(postSorted, postSorted.voteScore)
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
    const { dispatch } = this.props
    dispatch(newPost(postSorted))
    if (postSorted) {
      this.setState(() => ({
        redirect: true,
      }))
    }
  }

  render() {
    const { posts } = this.props
    const postSorted = posts
    if (this.state.redirect) {
      return <Redirect to="/newpost" />
    }
    return (
      <div className="Home row justify-content-center flex-column">
        <h1 className="col m-4 align-center" >
            All the post
        </h1>
        <div className="col m-4">
          <Button
            color="teal"
            icon
            labelPosition="left"
            onClick={() => this.sortDate(postSorted)}
          >
            <Icon name={this.state.toggleDate === true ? 'arrow down' : 'arrow up'} />
            Sort Date
          </Button>
          <Button
            color="red"
            icon
            labelPosition="left"
            onClick={() => this.voteScore(postSorted)}
          >
            <Icon name={this.state.toggleScore === true
              ? 'arrow down' : 'arrow up'}
            />
            Sort Score
          </Button>

          <Button
            color="orange"
            icon
            labelPosition="left"
            onClick={() => this.newPost(postSorted)}
          >
            <Icon name="add" />
            Add New Post
          </Button>

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
  const sortedTimestamp = sortBy(arrPosts, arrPosts.timestamp)
  return {
    posts: sortedTimestamp,
  }
}
export default withRouter(connect(mapStateToProps)(Home))
