/*
 * Categories.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleDeletePost } from '../actions/shared'
import { Container, Card } from 'semantic-ui-react'
import { CenterText } from '../css/Styled.js'
import Post from './Post'

class Categories extends Component {
   handleDelete = (id) => {
     this.props.dispatch(handleDeletePost(id))
   }
   render() {
     const { category } = this.props.match.params
     const { posts } = this.props
     return (
       <Container>
         <CenterText>
          Categories: {category }
         </CenterText>
         <Card.Group className="ui four column doubling stackable grid container">
           {posts.map(post => (
             <Post key={post.id} deletePost={this.handleDelete} post={post} />
            ))}
         </Card.Group>
       </Container>
     )
   }
}
function mapStateToProps({ categories, posts }, { match }) {
  const { category } = match.params
  return {
    posts: Object.values(posts).filter(post => post.category === category),
  }
}
export default connect(mapStateToProps)(Categories)
