import React, { Component } from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// import { Button } from 'styled-components'
import { NavBrand, HeaderNav, NavLinkTop } from '../css/Styled'
import { Button } from 'semantic-ui-react'


class Header extends Component {
  state = {
    isActive: false,
  }

  render() {
    const { categories } = this.props
    // console.log(this.props)
    return (
      <HeaderNav className="navbar navbar-expand-lg">
        <nav className="navbar navbar-expand-lg">
          <NavBrand>
            <Link className="navbar-brand" to="/">
              Overview Project
            </Link>
          </NavBrand>
          <button
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbarNav"
            data-toggle="collapse"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <NavLinkTop className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {
                      Array.isArray(categories) && (
                        categories.map((cat, i) => (
                          <li
                            key={cat.path}
                            className="nav-item"
                          >
                            <NavLink
                              activeClassName="active"
                              className="nav-link"
                              to={`/page/${cat.path}`}
                            >
                              {cat.name}
                            </NavLink>
                          </li>
                        ))
                      )
                    }
            </ul>
          </NavLinkTop>
        </nav>
      </HeaderNav>
    )
  }
}
function mapStateToProps({ categories }, props) {
  return {
    categories: categories.categories,
  }
}
export default withRouter(connect(mapStateToProps)(Header))

