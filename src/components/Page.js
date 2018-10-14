/*
 * Page.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCommentById } from '../utils/_api'

class Page extends Component {
  state = {
    comments: '',
  }
  componentDidMount() {
    const { location } = this.props
    const id = location.search.replace(/\?id=/, '')
    // getCommentById(id).then((res, req) => {
    // console.log(res)
    // if (res) {
    // this.setState(() => ({
    // comments: Object.values(res),
    // }))
    // }
    // })
  }
  render() {
    const { match, post } = this.props
    const { comments } = this.state
    console.log(comments)
    if (comments.length > 0) {
      comments.map(e => e.id)
    }
    console.log(post)
    return (
      <div className="Page">
        Pages
        {match.params.id}
        {comments.length > 0
        ? comments.map(comment => (<li key={comment.id}>{comment.id}</li>))
        : 'no comments'
        }

      </div>
    )
  }
}
function mapStateToProps({ posts, categories }, { location }) {
  const id = location.search.replace(/\?id=/, '')
  console.log(Object.values(posts))
  const t = Object.values(posts)
  console.log(t)
  const post = Object.values(posts).filter((e) => {
    e.id === id
  })
  console.log(post)
  // console.log(posts, categories)
  return {
    post,
    categories,
  }
}
export default connect(mapStateToProps)(Page)
