/*
 * Newcomment.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component, Fragment } from 'react'
// import { generateUID } from '../utils/helpers'
import { connect } from 'react-redux'
import { handleCommentById, handleAddComment } from '../actions/shared'
import { Redirect } from 'react-router-dom'

import { Header, Button, Container } from 'semantic-ui-react'
import { CenterText, FormBlock } from '../css/Styled.js'
import '../css/helpers.css'

// API
// id: Any unique ID. As with posts, UUID is probably the best here.
// timestamp: timestamp. Get this however you want.
// body: String
// author: String
// parentId: Should match a post id in the database.

class Newcomment extends Component {
  constructor(props) {
    super()
    this.state = {
      comment: {
        body: '',
        author: '',
      },
      redirectToPage: null,
      isEmpty: null,
      loadingSubmit: false, // loading in button
    }
  }

  handleSubmitAdd = (event) => {
    const { newComment, idPost, post } = this.props
    const { comment } = this.state
    event.preventDefault()
    this.setState(() => ({
      loadingSubmit: true,
    }))
    console.log(newComment)
    setTimeout(() => { // play on second to display the loading animation
      if (newComment) {
        console.log('new')
        console.log(comment)
        this.props.dispatch(handleAddComment(comment, post))
        this.setState(() => ({
          isEmpty: false,
          loadingSubmit: false,
        }))
      } else {
        // return false
        this.setState(() => ({
          isEmpty: false,
          loadingSubmit: false,
        }))
        // this.props.dispatch(handleEditcomment(comment))
      }
      return false
    }, 150)
  }
  handleChange = (event, prop) => {
    const { comment } = this.state
    this.setState({
      comment: {
        ...comment,
        [prop]: event.target.value,
      },
    })
  }
  componentDidMount() {
    const { idPost } = this.props.match.params
    this.props.dispatch(handleCommentById(idPost))// load comments
  }

  render() {
    const { newComment } = this.props
    const { comment, redirectToPage } = this.state
    if (redirectToPage) {
      return <Redirect to="/" />
    }
    console.log(comment)
    return (
      <Container className="ui segment containerCenter" >
        {this.state.isEmpty
          ? <Fragment>
            <Header as="h1" color="red">All the fields are required</Header>
            </Fragment>
            : newComment ? <CenterText>Add New comment</CenterText> : <CenterText>update comment</CenterText>}
        <FormBlock>
          <form className="ui form" onSubmit={this.handleSubmitAdd}>
            <div className="field">
              <label htmlFor="body">Content</label>
              <textarea
                id="body"
                onChange={e => this.handleChange(e, 'body')}
                placeholder="Enter content"
                rows="3"
                value={comment.body}
              />
            </div>
            <div className="field">
              <label htmlFor="author">Author</label>
              <input
                id="author"
                onChange={e => this.handleChange(e, 'author')}
                placeholder="Enter Author"
                type="text"
                value={comment.author}
              />
            </div>
            <Button
              className="btn btn-primary"
              loading={!!this.state.loadingSubmit}
              type="submit"
            >
                Submit
            </Button>
          </form>
        </FormBlock>
      </Container>
    )
  }
}
function mapStateToProps({ comments, posts }, { match }) {
  let newComment = null
  const idPost = match.params.idPost
  const idComment = match.params.idComment
  let post
  // console.log(idComment, idPost)
  // console.log(comments, idComment, idPost, newComment, posts)
  if (idComment === 'new') {
    // new comment
    newComment = true
    post = Object.values(posts).filter(e => e.id === idPost)
    // console.log(post)
  } else {
    // update comment
    newComment = false
    // const t = comments.map(comment => comment.id[idComment])
    // console.log(t)
  }
  return {
    idPost,
    idComment,
    newComment,
    post: post[0],
    // comment,
  }
}
export default connect(mapStateToProps)(Newcomment)
