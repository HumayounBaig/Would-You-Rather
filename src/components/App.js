import React, { Component } from 'react';
import { handleInitialData } from '../redux/actions/shared';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Login from './Login'
import "../styles/App.css"
import Dashboard from './Dashboard';
import CreatePoll from './CreatePoll';
import Nav from './Nav';
import LeaderBoard from './LeaderBoard';
import InvalidPath from './InvalidPath';
import QuestionCard from './QuestionCard'
import { Row, Col } from 'reactstrap';
class App extends Component {

  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { authUser } = this.props;
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
                  <Route path="/add" component={CreatePoll} />
                  <Route path="/leaderboard" component={LeaderBoard} />
                  <Route path="/questions/invalid" component={InvalidPath} />
                  <Route path="/questions/:questionId" component={QuestionCard} />
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
  <Row>
    <Col md={{ size: 6, offset: 3 }}>
      {children}
    </Col>
  </Row>
)

function mapStateToProps(state) {
  return {
    authUser: state.authUser
  }
  
}

export default connect(
  mapStateToProps,
  { handleInitialData }
)(App);
