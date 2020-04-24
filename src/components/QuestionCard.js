import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Media, CardHeader, Card, Button, CardTitle, Row, Col, CardBody } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import "../styles/App.css"

function QuestionCard(props) {
  const [viewQuestion, setViewQuestion] = useState(false)

  const { question, user, isAnswered } = props

  const handleClick = e => {
    setViewQuestion(!viewQuestion)
  };
  console.log(props)
  if (viewQuestion === true) {
    return <Redirect push to={`/questions/${question.id}`} />;
  }

  return (
    <div>
      <Row>
        <Col sm="12">
          <Card body>
            <CardHeader>
              <CardTitle>{`${user.name} asks:`}</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md="2">
                  <Media object data-src={user.avatarURL} alt="" />
                </Col>
                <Col>
                  <p>Would you rather</p>
                  <p className="text-center">{question.optionOne.text}...</p>
                  <br/>
                  <Button  color="primary" onClick={handleClick}>
                    View Poll
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>

  );
}

function mapStateToProps({users}, props) {
  console.log(props);
  console.log(users)
  const user = users[props.userId];
  return {
    user 
  }
} 

export default connect(
  mapStateToProps,
)(QuestionCard);
