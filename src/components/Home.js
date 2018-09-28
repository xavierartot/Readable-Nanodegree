import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import pullAll from 'lodash/pullAll'
import classnames from 'classnames'

class Home extends Component {
  static propTypes = {
  }
  componentDidMount() {
    // console.log(this.props.store.getState())
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

