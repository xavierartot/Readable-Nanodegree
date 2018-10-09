/*
 * posts.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 *  loop through an array to display posts
 * Distributed under terms of the MIT license.
 */
import React, { Component } from 'react'
// import { formatDate } from '../utils/helpers'
// import ScoreButton from './ScoreButton'
import Post from './Post'
import { Card } from 'semantic-ui-react'

class posts extends Component {
  render() {
    const { posts, sortedVoted } = this.props
    let displayPosts = posts
    if (sortedVoted !== null) {
      displayPosts = sortedVoted
    }
    return (
      <div className="posts">
        <Card.Group className="ui four column doubling stackable grid container">
          {displayPosts && displayPosts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </Card.Group>
      </div>
    )
  }
}
export default posts
