import React, { Component } from 'react';
import { handleInitialData } from '../redux/actions/shared';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Login from './Login'
import "../styles/App.css"
import store from '../store';
import Dashboard from './Dashboard';
import CreatePoll from './CreatePoll';
import Nav from './Nav';
import LeaderBoard from './LeaderBoard';
import InvalidPath from './InvalidPath';
import QuestionCard from './QuestionCard'
class App extends Component {

  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { authUser } = store.getState();
    return (
      <div className="App">

        {
          authUser === null ? (
            <Route render={() => (<Login />)} />
          )
          :
          (
            <>
              <Nav />
              <Home>
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/new-poll" component={CreatePoll} />
                  <Route path="/leaderboard" component={LeaderBoard} />
                  <Route path="/questions/:questionId" component={QuestionCard} />
                  <Route path="/questions/invalidId" component={InvalidPath} />
                  <Route component={InvalidPath} />
                </Switch>
              </Home>
            </>
          )
        }
      </div>
    );
  }
}

const Home = ({ children }) => (
  <div>
    {children}
  </div>
)

function mapStateToProps({ authUser }) {
  return (
    authUser
  )
}

export default connect(
  mapStateToProps,
  { handleInitialData }
)(App);
