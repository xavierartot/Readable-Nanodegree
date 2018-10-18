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
import { withRouter, Link } from 'react-router-dom'

// actions
import { handleIncrementPost, handleDecrementPost } from '../actions/shared'


class Post extends Component {
  increment = () => {
    const { dispatch, post } = this.props
    dispatch(handleIncrementPost(post.id, post))
  }
  decrement = () => {
    const { dispatch, post } = this.props
    dispatch(handleDecrementPost(post.id, post))
  }
  handleEdit = (event, id) => {
    event.preventDefault()
    this.props.history.push({ pathname: '/newpost', search: `?id=${id}` })
  }
  postCommentsId = (event, id) => {
    this.props.history.push({ pathname: `/page/${id}` })
  }
  render() {
    const { post, deletePost, center } = this.props// come from Posts.js; center come from post
    return (
      <Card className={center}>
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
            <Link
              to={{
                pathname: `/category/${post.category}`,
                search: `?id=${post.id}`,
              }}
            >
              category: {post.category}
            </Link>
          </Card.Content>
          <Card.Content extra>
            <ScoreButton
              decrement={this.decrement}
              displayPosts={post}
              idPost={post.id}
              increment={this.increment}
            />
          </Card.Content>
          <Card.Content extra>
            {
            post.deleted ? 'post no publish' : 'post publish'
            }
          </Card.Content>
          <Card.Content extra>
            <a onClick={e => this.postCommentsId(e, post.id)}> comments: {post.commentCount}</a>
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
          <a onClick={() => deletePost(post.id)}>
            <Icon circular color="red" name="delete" />
          </a>
        </Card.Content>
      </Card>
    )
  }
}
export default withRouter(connect()(Post))
