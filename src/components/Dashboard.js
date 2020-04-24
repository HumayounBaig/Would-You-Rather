import React, { useState } from 'react';
import { handleInitialData } from '../redux/actions/shared';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import QuestionCard from './QuestionCard'
import "../styles/App.css"

function Dashboard(props) {

  const { questionsData } = props
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <Row className="Dashboard">
        <Col className="col-centered" md={{ size: 5, offset: 4 }}>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                Unanswered Questions
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                Answered Questions
            </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              {
                questionsData.unanswered.map((question) => (
                  <QuestionCard 
                    key={question.id}
                    userId={question.author}
                    question={question}
                    isAnswered={false}
                  />
                ))
              }
            </TabPane>
            <TabPane tabId="2">
              {
                questionsData.answered.map((question) => (
                  <QuestionCard 
                    key={question.id}
                    userId={question.author}
                    question={question}
                    isAnswered={true}
                  />
                ))
              }
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </div>

  );
}

function mapStateToProps({ authUser, users, questions }) {
  const answeredIds = Object.keys(users[authUser.value].answers);
  const answered = Object.values(questions)
    .filter(question => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter(question => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    questionsData: {
      answered,
      unanswered
    }
  }
}

Dashboard.propTypes = {
  questionsData: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
)(Dashboard);
