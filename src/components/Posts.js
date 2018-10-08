/*
 * posts.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 *  loop through an array to display posts
 * Distributed under terms of the MIT license.
 */
import React, { Component } from 'react'
import { formatDate } from '../utils/helpers'
import ScoreButton from './ScoreButton'
import { Icon, Card } from 'semantic-ui-react'


class posts extends Component {
  render() {
    const { posts, sortedVoted } = this.props
    let displayPosts = posts
    // console.log(sortedVoted)
    if (sortedVoted !== null) {
      displayPosts = sortedVoted
    }
    // console.log(sortedVoted)
    return (
      <div className="posts">
        <Card.Group className="ui four column doubling stackable grid container">
          {displayPosts && displayPosts.map(post => (
            <Card key={post.id} className="" >
              <Card.Content header={`title: ${post.title}`} />
              <Card.Content description={`category: ${post.category}`} />
              <Card.Content extra>
                date: {formatDate(post.timestamp)}
              </Card.Content>
              <Card.Content extra>

date: {formatDate(post.timestamp)}
              </Card.Content>
              <Card.Content extra>
                category: {post.category}
              </Card.Content>
              <Card.Content extra>
                <ScoreButton displayPosts={post} idPost={post.id} vote={post.voteScore} />
              </Card.Content>
              <Card.Content extra>
                {
                post.deleted ? 'post deleted' : 'post live'
                }
              </Card.Content>
              <Card.Content extra>
                number comment: {post.commentCount}
              </Card.Content>
              <Card.Content extra>
                <Icon name="user" />
                author: {post.author}
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    )
  }
}
export default posts
