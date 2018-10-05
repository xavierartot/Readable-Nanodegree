/*
 * NewPost.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component, Fragment } from 'react'
// import { addNewPost } from '../utils/_api'
import { generateUID } from '../utils/helpers'
import { connect } from 'react-redux'
import { newPost } from '../actions/posts'
import { Redirect } from 'react-router-dom'
import { addNewPost } from '../utils/_api'

class NewPost extends Component {
  state = {
    title: '',
    author: '',
    category: '',
    body: '',
    redirect: null,
    isEmpty: null,
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {
      title, author, category, body,
    } = this.state

    if (title === '' && author === '' && body === '' && category === '-') {
      return this.setState(() => ({
        isEmpty: true,
      }))
    }
    this.setState(() => ({
      isEmpty: false,
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
        redirect: true,
      }))
    }
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
      <Fragment>
        <h1>Add New Post</h1>
        {this.state.title}
        <form onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              className="form-control"
              id="title"
              onChange={e => this.handleChange(e, 'title')}
              placeholder="Enter title"
              required
              type="text"
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Content</label>
            <textarea
              className="form-control"
              id="body"
              onChange={e => this.handleChange(e, 'body')}
              placeholder="Enter content"
              required
              rows="3"
              value={this.state.body}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              className="form-control"
              id="author"
              onChange={e => this.handleChange(e, 'author')}
              placeholder="Enter Author"
              required
              type="text"
              value={this.state.author}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Choose a category</label>
            <select
              className="form-control"
              id="category"
              onChange={e => this.handleChange(e, 'category')}
            >
              <option name="-">-</option>
              {categories &&
                categories.map(category => (
                  <option key={category.path} name={category.name}>{category.name}</option>))}
            </select>
          </div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </Fragment>
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
