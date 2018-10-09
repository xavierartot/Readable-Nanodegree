/*
 * NewPost.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component, Fragment } from 'react'
import { generateUID } from '../utils/helpers'
import { connect } from 'react-redux'
import { handleAddPost } from '../actions/shared'
import { Redirect } from 'react-router-dom'

import { Header, Button, Container } from 'semantic-ui-react'
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


    setTimeout(() => { // play on second to display the loading animation
      if (title === '' || author === '' || body === '' || category === '') {
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
      this.props.dispatch(handleAddPost(newObj))

      // redirect to home
      if (newObj) {
        this.setState(() => ({
          loadingSubmit: false,
          redirect: true,
        }))
      }
    }, 150)
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
    if (this.props.findPostEdit) {
      console.log(this.props.findPostEdit)
    }
    return (
      <Container className="ui segment containerCenter" >
        {this.state.isEmpty
        ? <Fragment>
          <Header as="h1" color="red">All the fields are required</Header>
          </Fragment>
          : <CenterText>Add New Post</CenterText>}
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
                <option name="Select the category">-</option>
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
function mapStateToProps({ categories, posts }, { location }) {
  let findPostEdit
  const editId = location.search.replace(/\?id=/, '')
  if (editId) {
    findPostEdit = Object.values(posts).filter(e => e.id === editId)
  }
  return {
    categories: categories.categories,
    findPostEdit: editId ? findPostEdit[0] : false,
  }
}
export default connect(mapStateToProps)(NewPost)
