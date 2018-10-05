import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'
import { Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

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

  render() {
    const { posts } = this.props
    const postSorted = posts
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
          <Link to="/newpost">
            <Button
              color="orange"
              icon
              labelPosition="left"
            >
              <Icon name="add" />
              Add New Post
            </Button>
          </Link>

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
