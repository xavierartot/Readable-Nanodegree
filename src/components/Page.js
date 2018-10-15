/*
 * Page.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import Comments from './Comments'
import { handleCommentById, handleDeletePost } from '../actions/shared'

class Page extends Component {
  state = {
    comments: '',
  }
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.dispatch(handleCommentById(id))// load comments
  }
   handleDelete = (id) => {
     this.props.dispatch(handleDeletePost(id))
   }
   render() {
     const { postObj, comments } = this.props
     return (
       <div className="Page">
         <Post key={postObj.id} deletePost={this.handleDelete} post={postObj} />
         <Comments></Comments>
         {comments.length > 0
        ? comments.map(comment => (<li key={comment.id}>{comment.id}</li>))
        : 'no comments'
        }
       </div>
     )
   }
}
function mapStateToProps({ posts, comments }, { location, match }) {
  const { id } = match.params
  const post = Object.values(posts).filter(e => e.id === id)
  const postObj = Object.assign({}, ...post)
  // console.log(comments)
  return {
    postObj,
    comments: Object.values(comments),
  }
}
export default connect(mapStateToProps)(Page)
