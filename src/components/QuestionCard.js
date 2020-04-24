import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Media, CardHeader, Card, Button, CardTitle, Row, Col, CardBody } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import InitialPoll from './InitialPoll';
import ExpandedPoll from './ExpandedPoll'
import "../styles/App.css"

const questionTypes = {
  INITIAL : 'INITIAL',
  EXPANDED : 'EXPANDED',
  RESULTS : 'RESULTS',
};

const QuestionData = props => {
  const { questionType, question, isAnswered } = props; 
  switch (questionType){
    case questionTypes.INITIAL:
      return <InitialPoll question={ question } isAnswered={isAnswered} />
    case questionTypes.EXPANDED:
      return <ExpandedPoll question={ question } />
    // case questionType.RESULTS:
    //   return <PollResult question={ question } />

    default: 
      return null;
  }
}

function QuestionCard(props) {
  const [viewQuestion, setViewQuestion] = useState(false)

  const { question, author, isAnswered = null, questionType } = props
  const handleClick = e => {
    setViewQuestion(!viewQuestion)
  };
  if (viewQuestion === true) {
    return <Redirect push to={`/questions/${question.id}`} />;
  }



  return (
    <div>
      <Row>
        <Col sm="12">
          <Card body>
            <CardHeader style={{textAlign: 'left'}}>
              <span style={{fontWeight: 'bold'}}>
                {author.name}
              </span> asks:

            </CardHeader>
            <CardBody>
              <Row>
                <Col sm="2" md="2">
                  <img src={author.avatarURL} alt="" width="150px" />
                </Col>
                <Col>
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
  let question, questionType;
  if(questionId){
    question = questions[questionId];
    questionType = questionTypes.INITIAL;
  }else{
    const {questionId} = match.params;
    question = questions[questionId];
    const user = users[authUser.value];

    questionType = questionTypes.EXPANDED;

    if (Object.keys(user.answers).includes(questionId)){
      questionType = questionTypes.RESULTS;
    }
    
  }

  const author = users[question.author];

  return {
    question,
    author,
    questionType 
  }
} 

export default connect(
  mapStateToProps,
)(QuestionCard);
