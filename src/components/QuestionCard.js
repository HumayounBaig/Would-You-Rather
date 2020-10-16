import React from 'react';
import { connect } from 'react-redux';
import { CardHeader, Card,   Row, Col, CardBody } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import InitialPoll from './InitialPoll';
import ExpandedPoll from './ExpandedPoll';
import PollResult from './PollResults';
import "../styles/App.css"

const questionTypes = {
  INITIAL : 'INITIAL',
  EXPANDED : 'EXPANDED',
  RESULTS : 'RESULTS',
};
//questionType(child) is being set based on the parameters
//if questionId (url param) is null then return InitialPoll component
//if questionId is received then check to see if the question is already answered
//if already answered ? show PollResult component else show Expanded poll component.

const QuestionData = props => {
  const { questionType, question, isAnswered } = props; 
  switch (questionType){
    case questionTypes.INITIAL:
      return <InitialPoll question={ question } isAnswered={isAnswered} />
    case questionTypes.EXPANDED:
      return <ExpandedPoll question={ question } />
    case questionTypes.RESULTS:
      return <PollResult question={ question } />

    default: 
      return null;
  }
}

function QuestionCard(props) {
  
  const { question, author, isAnswered = null, questionType, invalidId } = props

  if(invalidId){
    return <Redirect to="/questions/invalid" />
  }

  return (
    <div style={{ margin: 10 }}>
      <Row>
        <Col sm="12" md="12">
          <Card body>
            <CardHeader style={{textAlign: 'left'}}>
              <span style={{fontWeight: 'bold'}}>
                {author.name}
              </span> asks:

            </CardHeader>
            <CardBody>
              <Row>
                <Col sm="4" md="4">
                  <img src={author.avatarURL} alt="" width="150px" />
                </Col>
                <Col sm="8" md="8">
                  <QuestionData
                    question={question}
                    questionType={questionType}
                    isAnswered={isAnswered}
                  />
                  
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>

  );
}

function mapStateToProps({users, questions, authUser}, {match, questionId}) { 

  let question, questionType, invalidId = false;
  let author;
  if(questionId){
    question = questions[questionId];
    author = users[question.author];
    questionType = questionTypes.INITIAL;
  }else{
    const {questionId} = match.params;
    question = questions[questionId];
    const user = users[authUser.value];

    if(question === undefined) {
      invalidId = true
    } else{
      questionType = questionTypes.EXPANDED;

      if (Object.keys(user.answers).includes(questionId)){
        questionType = questionTypes.RESULTS;
      }
      author = users[question.author];
    }
    

  }
  

  return {
    question,
    author,
    questionType,
    invalidId
  }
} 

export default connect(
  mapStateToProps,
)(QuestionCard);
