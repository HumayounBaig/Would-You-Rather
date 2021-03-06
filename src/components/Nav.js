import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../redux/actions/auth';
import { Collapse, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, Navbar, NavbarToggler, NavItem, Nav as BarNavigator, NavLink as Title } from 'reactstrap'
import { Link } from 'react-router-dom'

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
              <Title tag={Link} to="/" >Home</Title>
            </NavItem>
            <NavItem>
                <Title tag={Link} to="/add" >New Question</Title>
            </NavItem>
            <NavItem>
              <Title tag={Link} to="/leaderboard" >Leader Boards</Title>
            </NavItem> 
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <img src={authUser.image.src} width="30px" alt="" /> {" "}
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
