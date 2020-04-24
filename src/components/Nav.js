import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../redux/actions/auth';
import { Collapse, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, Media, Navbar, NavbarToggler, NavItem, Nav as BarNavigator, NavLink as Title } from 'reactstrap'
import { NavLink } from 'react-router-dom'

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
              <Title tag={NavLink} to="/" exact activeClassName="active" >Home</Title>
            </NavItem>
            <NavItem>
                <Title tag={NavLink} to="/new-poll" activeClassName="active" >New Question</Title>
            </NavItem>
            <NavItem>
              <Title tag={NavLink} to="/leaderboard" activeClassName="active" >Leader Boards</Title>
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
