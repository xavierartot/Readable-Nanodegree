import React, { Component, Fragment } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
// import { NavBrand, HeaderNav, NavLinkTop } from '../css/Styled'
import { Menu, Responsive } from 'semantic-ui-react'
import '../css/helpers.css'

class Header extends Component {
  state = {
    isActive: false,
  }

  render() {
    const { categories } = this.props
    return (
      <Fragment>
        <Responsive maxWidth={10559} minWidth={768}>
          <Menu className="navbar">
            <NavLink
              activeClassName="activeBrand"
              className="brand item"
              to="/"
            >
              Overview Project
            </NavLink>
            {Array.isArray(categories) && (
              categories.map((cat, i) => (
                <Fragment key={cat.path} >
                  <NavLink
                    activeClassName="active"
                    className="item"
                    to={`/category/${cat.path}`}
                  >
                    {cat.name}
                  </NavLink>
                </Fragment>
              ))
            )}
            <div className="right menu">
              <NavLink activeClassName="activeFake" className="item" to="/">Login</NavLink>
              <NavLink activeClassName="activeFake" className="item" to="/">Register</NavLink>
            </div>
          </Menu>
        </Responsive>

        {/* CSS is in /css/helpers.css */}
        <Responsive maxWidth={768}>
          <nav>
            <div id="menuToggle">
              <input type="checkbox" />
              <span />
              <span />
              <span />
              <ul id="menu">
                <li><NavLink to="/"><li>Home</li></NavLink></li>
                <li><NavLink to="/"><li>About</li></NavLink></li>
              </ul>
            </div>
          </nav>
        </Responsive>
      </Fragment>
    )
  }
}
function mapStateToProps({ categories }, props) {
  return {
    categories: categories.categories,
  }
}
export default withRouter(connect(mapStateToProps)(Header))

