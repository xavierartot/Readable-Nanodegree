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
import { Label, Grid, Container } from 'semantic-ui-react'
// import { Link, Route } from 'react-router-dom'

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
       <Grid
         centered
         className="page"
         style={{ marginTop: '2rem' }}
         verticalAlign="middle"
       >
         <Grid.Row >
           <Container>
             <Label color="red" pointing="below" size="huge">Post</Label>
             <Post
               key={postObj.id}
               center="centered"
               deletePost={this.handleDelete}
               post={postObj}
             />
             <Label color="red" pointing="below" size="huge">Comments</Label>
             <div className="ui grid centered">
               <Grid.Column className="containerCenter">
                 {comments.length >= 0
                 ? comments.map(comment => (<Comments key={comment.id} obj={comment} post={postObj} />))
                 : 'no comments'
                 }
               </Grid.Column>
             </div>
           </Container>
         </Grid.Row>
       </Grid>
     )
   }
}
function mapStateToProps({ posts, comments }, { location, match }) {
  const { id } = match.params
  const post = Object.values(posts).filter(e => e.id === id)
  const postObj = Object.assign({}, ...post)// get the post
  // console.log(comments)
  return {
    postObj,
    comments: Object.values(comments).filter(e => e.deleted === false),
  }
}
export default connect(mapStateToProps)(Page)
