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
import { connect } from 'react-redux'
import { handleDeletePost } from '../actions/shared'
import { withRouter } from 'react-router-dom'

class Post extends Component {
  handleDelete = (event, id) => {
    event.preventDefault()
    // console.log(id)
    this.props.dispatch(handleDeletePost(id))
  }
  handleEdit = (event, id) => {
    event.preventDefault()
    this.props.history.push({ pathname: '/newpost', search: `?id=${id}` })
  }
  showComment = (event) => {
    event.preventDefault()
  }
  render() {
    const { post } = this.props// come from Posts.js
    return (
      <Card>
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
            {post.voteScore}
          </Card.Content>
          <Card.Content extra>
            {
            post.deleted ? 'post no publish' : 'post publish'
            }
          </Card.Content>
          <Card.Content extra>
            <a onClick={this.showComment}> comments: {post.commentCount}</a>
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
          <a onClick={e => this.handleEdit(e, post.id)} >
            <Icon circular color="teal" name="edit" />
          </a>
          <a onClick={e => this.handleDelete(e, post.id)}>
            <Icon circular color="red" name="delete" />
          </a>
        </Card.Content>
      </Card>
    )
  }
}
export default withRouter(connect()(Post))
