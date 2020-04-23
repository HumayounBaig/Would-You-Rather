import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticateUser } from '../redux/actions/auth';
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Spinner, FormGroup, Form, Label, Button, } from 'reactstrap'
import Select from 'react-select';


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

class Login extends Component {
  state = {
    loading: false
  }

  toggleLoader = () => {
    this.setState((prev) => ({
      loading: !prev.loading
    }))
  }

  render() {
    return (
      <div id="login">
        <Header />
        <Loader />
        <ConnectedLoginForm onLoading={this.toggleLoader} />
      </div>
    )
  }
}

class LoginForm extends Component {
  state = {
    currentUser: null
  }

  generateDropdownData = () => {
    const { users } = this.props;
    let userList = users.map(user => ({
      key: user.id,
      value: user.id,
      label: user.name,
      image: { avatar: true, src: user.avatarURL }
    }));
    return userList
  }

  handleChange = currentUser => {
    this.setState({
      currentUser
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { onLoading, authenticateUser } = this.props

    new Promise((res, rej) => {
      onLoading();
      setTimeout(() => res(), 500);
    }).then(() => authenticateUser(this.state.currentUser));
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Row>
        <Col md={{size: 6}}>
          <div style={{alignItems: 'center'}}>
            <Label for="exampleEmail">Select your Username to start playing</Label>
            <div style={{ width: "50%", marginLeft: "25%" }}>
              <Select
                value={currentUser}
                onChange={this.handleChange}
                options={this.generateDropdownData()}
              />
            </div>

            <Button onClick={this.handleSubmit} style={{ marginTop: 30 }} disabled={this.state.currentUser ? false : true}>Login</Button>
          </div>
          
        </Col>
      </Row>
    )
  }
}

LoginForm.propTypes = {
  name: PropTypes.number
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  }
}

const ConnectedLoginForm = connect(
  mapStateToProps,
  { authenticateUser }
)(LoginForm)

export default Login;