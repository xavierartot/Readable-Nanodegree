import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'
import { Button, Icon, Grid, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { LinkPadding, CenterText } from '../css/Styled.js'
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
              onClick={() => this.sortDate(postSorted)}
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
              onClick={() => this.voteScore(postSorted)}
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
        <div className="">
          <Posts
            posts={posts}
            sortedVoted={this.state.sortedVoted}
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
