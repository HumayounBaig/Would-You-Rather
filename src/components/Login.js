import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticateUser } from '../redux/actions/auth';
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Spinner, Label, Button } from 'reactstrap'
import Select, {components} from 'react-select';
import {withRouter} from 'react-router-dom'

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
  <Spinner color="primary" />
)

const BrandImage = () => (
  <img src="/images/avatars/logo.jpg" alt="" height="200px" size="medium" />
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
    const {loading} = this.state
    return (
      <div id="login text-center" > 
        <Row>
          <Col style={{textAlign: 'center'}}>
            <Header />
            <BrandImage />
            <ConnectedLoginForm onLoading={this.toggleLoader} history={this.props.history} />
            <br/>

            {
              loading &&
              <Loader />
            }
          </Col>
        </Row>
        
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
    // e.preventDefault()
    const { onLoading, authenticateUser } = this.props

    new Promise((res, rej) => {
      onLoading();
      setTimeout(() => res(), 500);
    }).then(() => {
      authenticateUser(this.state.currentUser)
    });
  }

  render() {
    const { currentUser } = this.state;
    const { Option } = components;
    const IconOption = (props) => (
      <Option {...props}>
        <img src={props.data.image.src} alt="" width="20px" /> {" "}
        {props.data.label}
      </Option>
    );
    return (
      <Row>
        <Col md={{ size: 4, offset: 4 }}>
          <div>
            <Label for="exampleEmail">Select your Username to start playing</Label>
            <div style={{ width: "50%", marginLeft: "25%", textAlign: 'left', marginBottom: 10 }}>
              <Select
                value={currentUser}
                onChange={this.handleChange}
                options={this.generateDropdownData()}
                components={{ Option: IconOption }}
              />
            </div>
            <Button disabled={this.state.currentUser === null} onClick={() => this.handleSubmit()} color="primary">Login</Button>
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

export default withRouter(Login);