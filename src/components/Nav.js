import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../redux/actions/auth';
import { Collapse, NavLink, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, Media, Navbar, NavbarToggler, NavItem, Nav as BarNavigator } from 'reactstrap'

function Nav(props) {

  const onLogout = e => {
    e.preventDefault();
    props.authenticateUser(null);
  }
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const {authUser} = props

  return (
    <div id="Nav">
      <Navbar color="light" light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <BarNavigator className="ml-auto mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink >New Question</NavLink>
            </NavItem>
            <NavItem>
              <NavLink >Leader Boards</NavLink>
            </NavItem> 
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <Media object data-src={authUser.image.src} alt="" />
                {authUser.label}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={onLogout}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </BarNavigator>
        </Collapse>

      </Navbar>
    </div>
  )

}

function mapStateToProps({ users, authUser }) {
  return {
    users,
    authUser
  }
}

export default connect(
  mapStateToProps,
  { authenticateUser }
)(Nav)
