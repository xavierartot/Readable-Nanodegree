/*
 * ScoreButton.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

class ScoreButton extends Component {
  render() {
    const {
      vote, increment, decrement,
    } = this.props
    return (
      <div>
        <Button.Group>
          <Button icon="plus" onClick={increment} positive />
          <Button.Or text={vote} />
          <Button icon="minus" negative onClick={decrement} />
        </Button.Group>
      </div>
    )
  }
}
function mapStateToProps(state, props) {
  return {
    state,
    vote: props.displayPosts.voteScore,
  }
}
export default connect(mapStateToProps)(ScoreButton)
