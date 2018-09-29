/*
 * Page.js
 * Copyright (C) 2018 xav <xav@xavs-Mac-mini>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Page extends Component {
  render() {
    const { match } = this.props
    // console.log(match.params.id)
    return (
      <div className="Page">
        Pages
        {match.params.id}
      </div>
    )
  }
}
function mapStateToProps({ state }, props) {
  return {
    state,
  }
}
export default connect(mapStateToProps)(Page)
