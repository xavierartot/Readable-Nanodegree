/*
 * NewPost.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component, Fragment } from 'react'
import { generateUID } from '../utils/helpers'
import { connect } from 'react-redux'
import { handleAddPost, handleEditPost } from '../actions/shared'
import { editPostApi } from '../utils/_api'
import { Redirect } from 'react-router-dom'

import { Header, Button, Container } from 'semantic-ui-react'
import { CenterText, FormBlock } from '../css/Styled.js'
import '../css/helpers.css'

class NewPost extends Component {
  constructor(props) {
    super()
    this.state = {
      post: {
        id: '',
        title: '',
        author: '',
        category: '',
        body: '',
      },
      redirectToHome: null,
      redirectToPost: null,
      isEmpty: null,
      update: false, // update post false if is new post
      loadingSubmit: false, // loading in button
    }
  }

  handleSubmitAdd = (event) => {
    event.preventDefault()
    this.setState(() => ({
      loadingSubmit: true,
    }))
    const {
      post,
      update,
    } = this.state
    setTimeout(() => { // play on second to display the loading animation
      if (post.title === '' || post.body === '') {
        return this.setState(() => ({
          isEmpty: true,
          loadingSubmit: false,
        }))
      }
      if (update === true) {
        // console.log('update')
        // return false
        this.setState(() => ({
          isEmpty: false,
          loadingSubmit: false,
          redirectToPost: true,
          // redirectToHome: true,
        }))
        this.props.dispatch(handleEditPost(post))
        editPostApi(post)
      }
      if (update === false) {
        // console.log('new')
        post.id = generateUID()
        post.timestamp = Date.now()
        post.voteScore = 0
        post.deleted = false
        post.commentCount = 0
        this.props.dispatch(handleAddPost(post))
        // redirect to home
        if (post.id !== '') {
          this.setState(() => ({
            isEmpty: false,
            loadingSubmit: false,
            redirectToHome: true,
          }))
        }
      }
      return false
    }, 150)
  }
  handleChange = (event, prop) => {
    const { post } = this.state
    this.setState({
      post: {
        ...post,
        [prop]: event.target.value,
        update: true,
      },
    })
  }
  componentDidMount() {
    const { post, location } = this.props
    // console.log(post, location.search)
    if (post && post.id !== '') {
      // console.log(post)
      this.setState({
        post,
        update: true,
      })
    } else {
      // console.log(post, location.search)
      // post is empty but not the id
      // redirect to the individual post
      // const id = location.search.replace(/\?id=/, '')
      // this.props.history.push({ pathname: `/page/${id}` })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { post } = this.props
    if (prevProps.post !== post) {
      if (post && post.id !== '') {
        this.setState({
          post,
          update: true,
        })
      }
    }
  }
  render() {
    const { categories } = this.props
    const {
      post, redirectToHome, redirectToPost, update,
    } = this.state
    if (redirectToHome) {
      return <Redirect to="/" />
    }
    if (redirectToPost) {
      return <Redirect to={`/page/${post.category}`} />
    }
    return (
      <Container className="ui segment containerCenter" >
        {this.state.isEmpty
          ? <Fragment>
            <Header as="h1" color="red">All the fields are required</Header>
            </Fragment>
            : update ? <CenterText>update Post</CenterText> : <CenterText>Add New Post</CenterText>}
        <FormBlock>
          <form className="ui form" onSubmit={this.handleSubmitAdd}>
            <div className="field">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                onChange={e => this.handleChange(e, 'title')}
                placeholder="Enter title"
                required
                type="text"
                value={post.title}
              />
            </div>
            <div className="field">
              <label htmlFor="body">Content</label>
              <textarea
                id="body"
                onChange={e => this.handleChange(e, 'body')}
                placeholder="Enter content"
                required
                rows="3"
                value={post.body}
              />
            </div>
            <div className="field">
              <label htmlFor="author">Author</label>
              <input
                disabled
                id="author"
                onChange={e => this.handleChange(e, 'author')}
                placeholder="Enter Author"
                required
                type="text"
                value={post.author}
              />
            </div>
            <div className="field">
              <label htmlFor="category">Choose a category</label>
              <select
                className="ui fluid dropdown"
                disabled
                id="category"
                onChange={e => this.handleChange(e, 'category')}
                value={post.category}
              >
                <option>Choose a category</option>
                {categories &&
                  categories.map(category => (
                    <option
                      key={category.path}
                      defaultValue={post.category}
                      name={category.name}
                    >{category.name}
                    </option>))}
              </select>
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
function mapStateToProps({ categories, posts }, { location }) {
  let post
  const editId = location.search.replace(/\?id=/, '')
  // console.log(location.search)
  if (editId) {
    post = Object.values(posts).filter(e => e.id === editId)
  }
  return {
    categories: categories.categories,
    post: editId ? post[0] : false,
  }
}
export default connect(mapStateToProps)(NewPost)
