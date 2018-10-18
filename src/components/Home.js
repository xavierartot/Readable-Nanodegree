import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'
import { connect } from 'react-redux'
import { handleDeletePost } from '../actions/shared'
import { LinkPadding, CenterText } from '../css/Styled.js'
import { Button, Icon, Grid, Container } from 'semantic-ui-react'
// components
import Posts from './Posts'
// import pullAll from 'lodash/pullAll'

class Home extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
  }
  state = {
    posts: null,
    toggleDate: true,
    toggleScore: true,
  }
   handleDelete = (id) => {
     this.props.dispatch(handleDeletePost(id))
   }
  sortDate = (postSorted) => {
    this.state.toggleDate === true
      ? this.setState(() => ({
        posts: postSorted.sort((b, a) => a.timestamp - b.timestamp),
        toggleDate: false,
      }))
      : this.setState(() => ({
        posts: postSorted.sort((b, a) => b.timestamp - a.timestamp),
        toggleDate: true,
      }))
  }
  voteScore = (postSorted) => {
    // https://stackoverflow.com/questions/15137948/how-can-i-do-an-asc-and-desc-sort-using-underscore-js with negative number
    const sort = sortBy(postSorted, num => -num.voteScore)
    this.state.toggleScore === true
      ? this.setState(() => ({
        posts: sort,
        toggleScore: false,
      }))
      : this.setState(() => ({
        posts: sort.reverse(),
        toggleScore: true,
      }))
  }

  componentDidMount() {
    const { posts } = this.props
    if (posts && posts.id !== '') {
      this.setState({
        posts,
        update: true,
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { posts } = this.props
    if (prevProps.posts !== posts) {
      if (posts && posts.id !== '') {
        this.setState({
          posts,
          update: true,
        })
      }
    }
  }

  render() {
    const { posts } = this.state

    return (

      <Container>
        <CenterText>
            All the post
        </CenterText>
        <Grid centered columns="equal">
          <LinkPadding>
            <Button
              color="teal"
              icon
              labelPosition="left"
              onClick={() => this.sortDate(posts)}
            >
              <Icon name={this.state.toggleDate === true ? 'arrow down' : 'arrow up'} />
            Sort Date
            </Button>
          </LinkPadding>
          <LinkPadding>
            <Button
              color="red"
              icon
              labelPosition="left"
              onClick={() => this.voteScore(posts)}
            >
              <Icon name={this.state.toggleScore === true
              ? 'arrow down' : 'arrow up'}
              />
            Sort Score
            </Button>
          </LinkPadding>
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
        </Grid>
        <div>
          <Posts
            deletePost={this.handleDelete}
            posts={posts}
          />
        </div>
      </Container>
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
