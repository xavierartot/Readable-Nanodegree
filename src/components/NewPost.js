/*
 * NewPost.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component, Fragment } from 'react'
import { generateUID } from '../utils/helpers'
import { connect } from 'react-redux'
import { newPost } from '../actions/posts'
import { Redirect } from 'react-router-dom'
import { addNewPost } from '../utils/_api'

import { Button, Container } from 'semantic-ui-react'
import { CenterText, FormBlock } from '../css/Styled.js'
import '../css/helpers.css'

class NewPost extends Component {
  state = {
    title: '',
    author: '',
    category: '',
    body: '',
    redirect: null,
    isEmpty: null,
    loadingSubmit: false,
  }

  handleSubmit = (event) => {
    this.setState(() => ({
      loadingSubmit: true,
    }))
    event.preventDefault()
    const {
      title, author, category, body,
    } = this.state

    // play on second for fun
    setTimeout(() => {
      if (title === '' && author === '' && body === '' && category === '-') {
        return this.setState(() => ({
          isEmpty: true,
          loadingSubmit: false,
        }))
      }
      this.setState(() => ({
        isEmpty: false,
        loadingSubmit: false,
      }))
      const id = generateUID()
      const newObj = {
        id,
        timestamp: Date.now(),
        title,
        author,
        category,
        body,
        voteScore: 0,
        deleted: false,
        commentCount: 0,
      }
      this.props.dispatch(newPost(newObj))

      // addNewPost  api server, add the post
      addNewPost(newObj)

      // redirect to home
      if (newObj) {
        this.setState(() => ({
          loadingSubmit: false,
          redirect: true,
        }))
      }
    }, 100)
  }

  handleChange = (event, prop) => {
    event.preventDefault()
    this.setState({ [prop]: event.target.value })
  }
  render() {
    const { categories } = this.props
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    if (this.state.isEmpty) {
      return (
        <Fragment>
          <p>All the fields are required</p>
        </Fragment>
      )
    }
    return (
      <Container className="ui segment containerCenter" >
        <CenterText>Add New Post</CenterText>
        <FormBlock>
          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="field">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                onChange={e => this.handleChange(e, 'title')}
                placeholder="Enter title"
                required
                type="text"
                value={this.state.title}
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
                value={this.state.body}
              />
            </div>
            <div className="field">
              <label htmlFor="author">Author</label>
              <input
                id="author"
                onChange={e => this.handleChange(e, 'author')}
                placeholder="Enter Author"
                required
                type="text"
                value={this.state.author}
              />
            </div>
            <div className="field">
              <label htmlFor="category">Choose a category</label>
              <select
                className="ui fluid dropdown"
                id="category"
                onChange={e => this.handleChange(e, 'category')}
              >
                <option name="-">-</option>
                {categories &&
                  categories.map(category => (
                    <option key={category.path} name={category.name}>{category.name}</option>))}
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
function mapStateToProps({ categories }, props) {
  // console.log(categories)
  return {
    categories: categories.categories,
  }
}
export default connect(mapStateToProps)(NewPost)
