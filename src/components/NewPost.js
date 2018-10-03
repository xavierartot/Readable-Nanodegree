/*
 * NewPost.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component, Fragment } from 'react'
import { addNewPost } from '../utils/_api'
import { generateUID } from '../utils/helpers'

class NewPost extends Component {
    handleSubmit = (event) => {
      event.preventDefault()
      console.log(event)
      const id = generateUID()
      const newObj =
        {
          id,
          timestamp: Date.now(),
        // title:
        // body:
        // author:
        // category:
        }
      // '8xf0y6ziyjabvozdd253nd': {
      // id: '8xf0y6ziyjabvozdd253nd',
      // timestamp: 1467166872634,
      // title: 'Udacity is the best place to learn React',
      // body: 'Everyone says so after all.',
      // author: 'thingtwo',
      // category: 'react',
      // voteScore: 6,
      // deleted: false,
      // commentCount: 2,
      // },
    }
    render() {
      console.log(navigator)
      console.log(Window.location)

      return (
        <Fragment>
          <h1>Add New Post</h1>
          <form onSubmit={this.handleSubmit} >
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                className="form-control"
                id="title"
                placeholder="Enter title"
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">body</label>
              <textarea
                className="form-control"
                id="body"
                placeholder="placeholder"
                rows="3"
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                className="form-control"
                id="author"
                placeholder="Enter Author"
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Choose a category</label>
              <select className="form-control" id="category">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <button className="btn btn-primary" type="submit">Submit</button>
          </form>
        </Fragment>
      )
    }
}
export default NewPost
