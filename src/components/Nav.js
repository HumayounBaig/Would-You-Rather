import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useStore } from 'react-redux';
import { authenticateUser } from '../redux/actions/auth';
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Spinner, Navbar, NavbarBrand, NavbarToggler, NavItem, } from 'reactstrap'
import Select from 'react-select';

function Nav(props) {

  const onLogout = e => {
    e.preventDefault();
    props.authenticateUser(null);
  }

  const Header = () => (
    <Row className="header">
      <Col>
        <Card>
          <CardHeader>
            <h3>Would You Rather!</h3>
          </CardHeader>
          <CardBody>
            <CardTitle>Login to start playing</CardTitle>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )

  const Loader = () => (
    <Spinner type="grow" color="primary" />
  )

  const BrandImage = () => (
    <img src="/images/avatars/animals.png" size="medium" centered />
  );

  return (
    <div id="Nav">
       <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
      </Navbar>
    </div>
  )

}

function mapStateToProps({users, currentUser}){
  return {
    users,
    currentUser
  }
}

export default connect (
  mapStateToProps,
  { authenticateUser } 
)(Nav)
