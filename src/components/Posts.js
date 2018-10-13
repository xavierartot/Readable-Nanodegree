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
    const { deletePost, posts } = this.props
    return (
      <div className="posts">
        <Card.Group className="ui four column doubling stackable grid container">
          {posts && posts.map(post => (
            <Post key={post.id} deletePost={deletePost} post={post} />
          ))}
        </Card.Group>
      </div>
    )
  }
}
export default posts
