/*
 * Comments.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Label, Segment, List, Icon } from 'semantic-ui-react'
import { formatDate } from '../utils/helpers'
import ScoreButton from './ScoreButton'
import { connect } from 'react-redux'
// actions
import { handleDeleteComment, handleIncrementComment, handleDecrementComment } from '../actions/shared'

class Comments extends Component {
  deleteComment = (obj) => {
    const { dispatch, post } = this.props
    dispatch(handleDeleteComment(obj, post))
  }
  increment = () => {
    const { dispatch, obj } = this.props
    dispatch(handleIncrementComment(obj.id, obj))
  }
  decrement = () => {
    const { dispatch, obj } = this.props
    dispatch(handleDecrementComment(obj.id, obj))
  }
  // handleAddComment
  render() {
    const { obj, post } = this.props// comment
    return (
      <Segment compact style={{ minWidth: '60%' }} >
        <Label as="a" ribbon="right">
          Update
        </Label>
        <p>
          <Label as="a" content={obj.author} icon="user" />
        </p>
        <p>{obj.body}</p>
        <p> created {formatDate(obj.timestamp)}</p>
        <ScoreButton
          decrement={this.decrement}
          displayPosts={obj}
          idPost={obj.id}
          increment={this.increment}
        />
        <List className="iconsGroup horizontal" style={{ marginTop: '1rem', float: 'right' }}>
          <List.Item as={Link} to={`/newcomment/${post.id}/${obj.id}`}>
            <Icon circular color="teal" name="edit" />
          </List.Item>
          <List.Item as={Link} to={`/newcomment/${post.id}/new`}>
            <Icon circular color="orange" name="add" />
          </List.Item>
          <List.Item onClick={() => this.deleteComment(obj)}>
            <Icon circular color="red" name="delete" />
          </List.Item>
        </List>
      </Segment>
    )
  }
}
export default withRouter(connect()(Comments))

