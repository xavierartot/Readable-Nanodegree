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

class NewPost extends Component {
  state = {
    title: '',
    author: '',
    category: '',
    body: '',
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const id = generateUID()
    const newObj = {
      id,
      timestamp: Date.now(),
      title: this.state.title,
      author: this.state.body,
      category: this.state.author,
      body: this.state.category,
      voteScore: 0,
      deleted: false,
      commentCount: 0,
    }
    this.props.dispatch(newPost(newObj))
    // fetch('/api/form-submit-url', {
    // method: 'POST',
    // body: data,
    // });
  }
  handleChange = (event, prop) => {
    event.preventDefault()
    this.setState({ [prop]: event.target.value })
  }
  render() {
    const { categories } = this.props
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
              type="text"
              value={this.state.author}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Choose a category</label>
            <select className="form-control" id="category" onChange={e => this.handleChange(e, 'category')}>
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
  console.log(categories)
  return {
    categories: categories.categories,
  }
}
export default connect(mapStateToProps)(NewPost)
