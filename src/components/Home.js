import React, { Component } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// import pullAll from 'lodash/pullAll'

class Home extends Component {
  static propTypes = {
  }
  render() {
    return (
      <div className="Home">
          home
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state,
  }
}
export default connect(mapStateToProps)(Home)

