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

class Comments extends Component {
  handleEdit = (event) => {
    event.preventDefault()
  }
  deleteComment = (event) => {
    event.preventDefault()
  }
  render() {
    const { obj } = this.props
    return (
      <Segment style={{minWidth: '60%'}} compact >
        <div className="header ui">
          {obj.author}
        </div>
        <p>{obj.body}</p>
        <p> created {formatDate(obj.timestamp)}</p>
        <p>
          {obj.voteScore}
        </p>
        <p>{obj.deleted}</p>
        <ScoreButton displayPosts={obj} idPost={obj.id} />

        <List className="containerCenter iconsGroup " >
          <List.Item onClick={this.add}>
            <Icon circular color="pink" name="user" />
          </List.Item>
          <List.Item onClick={e => this.handleEdit(e, obj.id)} >
            <Icon circular color="teal" name="edit" />
          </List.Item>
          <List.Item onClick={() => this.deleteComment(obj.id)}>
            <Icon circular color="red" name="delete" />
          </List.Item>
        </List>
      </Segment>
    )
  }
}
export default Comments

