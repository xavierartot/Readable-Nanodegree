/*
 * posts.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 *  loop through an array to display posts
 * Distributed under terms of the MIT license.
 */
import React, { Component } from 'react'
import { formatDate } from '../utils/helpers'
import ScoreButton from './ScoreButton'

class posts extends Component {
  render() {
    const { posts, sortedVoted } = this.props
    let displayPosts = posts
    // console.log(sortedVoted)
    if (sortedVoted !== null) {
      displayPosts = sortedVoted
    }
    // console.log(sortedVoted)
    return (
      <div className="posts">
        {displayPosts && displayPosts.map(post => (
          <ul key={post.id} className="list-group mb-3 col-auto">
            <li className="list-group-item">
                date: {formatDate(post.timestamp)}
            </li>
            <li className="list-group-item">
                title: {post.title}
            </li>
            <li className="list-group-item">
                body: {post.body}
            </li>
            <li className="list-group-item">
                author: {post.author}
            </li>
            <li className="list-group-item">
                category: {post.category}
            </li>
            <li className="list-group-item">
              <ScoreButton displayPosts={post} idPost={post.id} vote={post.voteScore} />
            </li>
            <li className="list-group-item">
              {
                post.deleted ? 'post deleted' : 'post live'
                }
            </li>
            <li className="list-group-item">
                number comment: {post.commentCount}
            </li>
          </ul>
          ))}
      </div>
    )
  }
}
export default posts
