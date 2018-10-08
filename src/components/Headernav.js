/*
 * headernav.js
 * Distributed under terms of the MIT license.
 * https://codesandbox.io/s/325y47xk36
 */
import _ from 'lodash'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive,
} from 'semantic-ui-react'

const NavBarMobile = ({
  children,
  categories,
  onPusherClick,
  onToggle,
  rightItems,
  visible,
}) => (
  <Sidebar.Pushable>
    <Sidebar
      animation="overlay"
      as={Menu}
      icon="labeled"
      inverted
      items={categories}
      vertical
      visible={visible}
    />
    <Sidebar.Pusher
      dimmed={visible}
      onClick={onPusherClick}
      style={{ minHeight: '100vh' }}
    >
      <Menu fixed="top" >
        <Menu.Item>
          <Link className="navbar-brand" to="/">
              Overview Project
          </Link>
        </Menu.Item>
        <Menu.Item onClick={onToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
        <Menu.Menu position="right">
          {_.map(rightItems, cat =>
            (<Menu.Item {...cat}>
              <Link
                activeClassName="active"
                className="nav-link"
                to={`/page/${cat.path}`}
              >
                {cat.name}
              </Link>
             </Menu.Item>))}
        </Menu.Menu>
      </Menu>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
)

const NavBarDesktop = ({ categories, rightItems }) => (
  <Menu fixed="top">
    <Menu.Item>
      <Link className="navbar-brand" to="/">
              Overview Project
      </Link>
    </Menu.Item>
    {_.map(categories, cat => (
      <Menu.Item key={cat.path} >
        <Link
          activeClassName="active"
          className="nav-link"
          to={`/page/${cat.path}`}
        >
          {cat.name}
        </Link>
      </Menu.Item >
      ))}
    <Menu.Menu position="right">
      {_.map(rightItems, item => <Menu.Item {...item} />)}
    </Menu.Menu>
  </Menu>
)

const NavBarChildren = ({ children }) => (
  <Container style={{ marginTop: '5em' }}>{children}</Container>
)

class NavBar extends Component {
  state = {
    visible: false,
  };

  handlePusher = () => {
    const { visible } = this.state

    if (visible) this.setState({ visible: false })
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children, categories, rightItems } = this.props
    const { visible } = this.state

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile
            categories={categories}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightItems}
            visible={visible}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop categories={categories} rightItems={rightItems} />
          <NavBarChildren>{children}</NavBarChildren>
        </Responsive>
      </div>
    )
  }
}

// const categories = [
// { as: 'a', content: 'Home', key: 'home' },
// { as: 'a', content: 'Users', key: 'users' },
// ]
const rightItems = [
  { as: 'a', content: 'Login', key: 'login' },
  { as: 'a', content: 'Register', key: 'register' },
]

const Headernav = ({ categories }) => (
  <NavBar categories={categories} rightItems={rightItems} />
)

function mapStateToProps({ categories }, props) {
  return {
    categories: categories.categories,
  }
}
export default withRouter(connect(mapStateToProps)(Headernav))
