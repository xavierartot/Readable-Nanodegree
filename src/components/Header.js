import React, { Component, Fragment } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
// import { NavBrand, HeaderNav, NavLinkTop } from '../css/Styled'
import { Menu, Responsive } from 'semantic-ui-react'

class Header extends Component {
  state = {
    isActive: false,
  }

  // handleItemClick = (event, { name }) => {
  // this.setState({ activeItem: name })
  // event.preventDefault()
  // }
  render() {
    const { categories } = this.props
    return (
      <Fragment>
        <Responsive maxWidth={10559} minWidth={768}>
          <Menu className="navbar">
            <NavLink
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
                    to={`/page/${cat.path}`}
                  >
                    {cat.name}
                  </NavLink>
                </Fragment>
              ))
            )}
            <div className="right menu">
              <NavLink className="item" to="/">Login</NavLink>
              <NavLink className="item" to="/">Register</NavLink>
            </div>
          </Menu>
        </Responsive>

        {/* CSS is in /public/index.html */}
        <Responsive maxWidth={768}>
          <nav>
            <div id="menuToggle">
              {/*
              A fake / hidden checkbox is used as click reciever,
              so you can use the :checked selector on it.
               */}
              <input type="checkbox" />

              {/*
              Some spans to act as a hamburger.

              They are acting like a real hamburger,
              not that McDonalds stuff.
               */}
              <span />
              <span />
              <span />

              {/*
              Too bad the menu has to be inside of the button
              but hey, it's pure CSS magic.
               */}
              <ul id="menu">
                <NavLink to="/"><li>Home</li></NavLink>
                <NavLink to="/"><li>About</li></NavLink>
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

