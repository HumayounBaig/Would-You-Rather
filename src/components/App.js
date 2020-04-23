import React, { Component } from 'react';
import { handleInitialData } from '../redux/actions/shared';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Login from './Login'
import "../styles/App.css"
import store from '../store';
import Dashboard from './Dashboard';

class App extends Component {

  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { auth } = store.getState();

    return (
      <div className="App">
        {
          auth === null ? (
            <Route path="/" component={Login} />
          )
          :
          (
            <Route path="/" component={Dashboard} />
          )
        }

      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return (
    auth
  )
}

export default connect(
  mapStateToProps,
  { handleInitialData }
)(App);
