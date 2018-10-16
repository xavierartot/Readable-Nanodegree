/*
 * Comments.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component } from 'react'
import { Segment, List, Icon } from 'semantic-ui-react'
import { formatDate } from '../utils/helpers'
import ScoreButton from './ScoreButton'
import { connect } from 'react-redux'
// actions
// import { incrementComment, decrementComment } from '../actions/comments'
import { handleDeleteComment, handleIncrementComment, handleDecrementComment } from '../actions/shared'

class Comments extends Component {
  handleEdit = (event) => {
    // const { dispatch, obj } = this.props
    event.preventDefault()
  }
  deleteComment = (obj) => {
    const { dispatch } = this.props
    dispatch(handleDeleteComment(obj))
  }
  increment = () => {
    const { dispatch, obj } = this.props
    dispatch(handleIncrementComment(obj.id, obj))
  }
  decrement = () => {
    const { dispatch, obj } = this.props
    dispatch(handleDecrementComment(obj.id, obj))
  }
  render() {
    const { obj } = this.props// comment
    return (
      <Segment compact style={{ minWidth: '60%' }} >
        <div className="header ui">
          {obj.author}
        </div>
        <p>{obj.body}</p>
        <p> created {formatDate(obj.timestamp)}</p>
        <ScoreButton
          decrement={this.decrement}
          displayPosts={obj}
          idPost={obj.id}
          increment={this.increment}
        />
        <List className="iconsGroup horizontal" style={{ marginTop: '1rem' }}>
          <List.Item onClick={this.add}>
            <Icon circular color="pink" name="user" />
          </List.Item>
          <List.Item onClick={e => this.handleEdit(e, obj.id)} >
            <Icon circular color="teal" name="edit" />
          </List.Item>
          <List.Item onClick={() => this.deleteComment(obj)}>
            <Icon circular color="red" name="delete" />
          </List.Item>
        </List>
      </Segment>
    )
  }
}
export default connect()(Comments)

