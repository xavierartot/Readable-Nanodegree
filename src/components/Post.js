/*
 * post.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component } from 'react'
import { Divider, Icon, Card } from 'semantic-ui-react'
import { formatDate } from '../utils/helpers'
import ScoreButton from './ScoreButton'

class Post extends Component {
  render() {
    const { post } = this.props
    return (
      <Card key={post.id}>
        <Card.Content>
          <Card.Header>{post.title}</Card.Header>
          <Card.Description>
            {post.body}
          </Card.Description>
          <Divider clearing />
          <Card.Meta>
            created {formatDate(post.timestamp)}
          </Card.Meta>
          <Card.Content extra>
            category: {post.category}
          </Card.Content>
          <Card.Content extra>
            <ScoreButton displayPosts={post} idPost={post.id} vote={post.voteScore} />
          </Card.Content>
          <Card.Content extra>
            {
            post.deleted ? 'post no publish' : 'post publish'
            }
          </Card.Content>
          <Card.Content extra>
            number comments: {post.commentCount}
            <a className="marginLeft ">
              {post.commentCount > 0 && <Icon circular color="brown" name="comments outline" />}
            </a>
          </Card.Content>
        </Card.Content>

        <Card.Content extra>
          <a>
            <Icon name="user" />
            author: {post.author}
          </a>

        </Card.Content>
        <Card.Content className="containerCenterRow iconsGroup " extra>
          <a onClick={this.add}>
            <Icon circular color="pink" name="user" />
          </a>
          <a onClick={this.handleEdit} >
            <Icon circular color="teal" name="edit" />
          </a>
          <a onClick={this.handleDelete}>
            <Icon circular inverted name="delete" />
          </a>
        </Card.Content>
      </Card>
    )
  }
}
export default Post
