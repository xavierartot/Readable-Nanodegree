/*
 * Newcomment.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component, Fragment } from 'react'
// import { generateUID } from '../utils/helpers'
import { connect } from 'react-redux'
import { handleUpdateComment, handleCommentById, handleAddComment } from '../actions/shared'
import { Redirect } from 'react-router-dom'

import { Header, Button, Container } from 'semantic-ui-react'
import { CenterText, FormBlock } from '../css/Styled.js'
import '../css/helpers.css'

class Newcomment extends Component {
  constructor(props) {
    super()
    this.state = {
      comment: {
        body: '',
        author: '',
      },
      commentUpdate: {
        body: '',
        author: '',
      },
      redirectToPage: null,
      isEmpty: null,
      loadingSubmit: false, // loading in button
    }
  }

  handleSubmitAdd = (event) => {
    const { newComment, post } = this.props
    event.preventDefault()
    this.setState(() => ({
      loadingSubmit: true,
    }))
    console.log(newComment)
    setTimeout(() => { // play on second to display the loading animation
      if (newComment) {
        const { comment } = this.state
        console.log('new')
        console.log(comment)
        this.props.dispatch(handleAddComment(comment, post))
        this.setState(() => ({
          isEmpty: false,
          loadingSubmit: false,
          redirectToPage: true,
        }))
      } else { // update comment
        // return false
        const { idPost } = this.props
        const { commentUpdate } = this.state
        console.log(commentUpdate, idPost)
        this.setState(() => ({
          isEmpty: false,
          loadingSubmit: false,
          redirectToPage: true,
        }))
        this.props.dispatch(handleUpdateComment(idPost, commentUpdate))
      }
      return false
    }, 150)
  }
  handleChange = (event, prop) => {
    const { comment, commentUpdate } = this.state
    this.setState({
      comment: {
        ...comment,
        [prop]: event.target.value,
      },
      commentUpdate: {
        ...commentUpdate,
        [prop]: event.target.value,
      },
    })
  }
  componentDidUpdate(prevProps, prevState) {
    const { comment } = this.props

    if (prevProps.comment !== comment) {
      if (comment && comment.id !== '') {
        this.setState({
          commentUpdate: { ...comment },
        })
      }
    }
  }
  componentDidMount() {
    const { idPost } = this.props.match.params
    this.props.dispatch(handleCommentById(idPost))// load comment
  }

  render() {
    const { newComment, idPost } = this.props
    const { comment, redirectToPage, commentUpdate } = this.state
    if (redirectToPage) {
      return <Redirect to={`/page/${idPost}`} />
    }
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
                value={commentUpdate !== undefined ? `${commentUpdate.body}` : comment.body}
              />
            </div>
            <div className="field">
              <label htmlFor="author">Author</label>
              <input
                id="author"
                onChange={e => this.handleChange(e, 'author')}
                placeholder="Enter Author"
                type="text"
                value={commentUpdate !== undefined ? `${commentUpdate.author}` : comment.author}
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
  const post = Object.values(posts).filter(e => e.id === idPost)
  let comment
  if (idComment === 'new') {
    // new comment
    newComment = true
    comment = []
    // console.log(post)
  } else {
    // update comment
    newComment = false
    comment = Object.values(comments).filter(e => e.id === idComment)
    console.log(comment)
  }
  return {
    idPost,
    idComment,
    newComment,
    post: post[0],
    comment: comment[0],
  }
}
export default connect(mapStateToProps)(Newcomment)
