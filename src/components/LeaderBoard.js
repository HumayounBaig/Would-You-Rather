import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Media, Card, Button, Input, Row, Col, CardBody, CardTitle } from 'reactstrap';
 
function LeaderBoard(props){

  const medalColor = ['gold', 'silver', 'bronze']

  const { leaderboards } = props

  return (
    <div>
      <Row>
        <Col sm="12" className="col-centered" md={{ size: 5, offset: 4 }}>
          {
            leaderboards.map((item, index) => (
              <Card body key={item.id}>
                <CardBody>
                  <Row>
                    <Col md="2">
                      <Media object data-src={item.avatarURL} alt="" />
                    </Col>
                    <Col>
                      <p>{item.name}</p>
                      <Row>
                        <Col>
                          Answered Questions
                        </Col>  
                        <Col>
                          {item.answersNo}
                        </Col>  
                      </Row>              
                      <Row>
                        <Col>
                          Created Questions
                        </Col>  
                        <Col>
                          {item.questionsNo}
                        </Col>  
                      </Row>                      
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            ))
          }

        </Col>
      </Row>
    </div>

  );
}

function mapStateToProps({ users }) {
  const leaderboards = Object.values(users)
    .map(user => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      total: Object.values(user.answers).length + user.questions.length,
      answersNo: Object.values(user.answers).length,
      questionsNo: user.questions.length,
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3);

  return {
    leaderboards
  }
}

export default connect(
  mapStateToProps,
)(LeaderBoard);
