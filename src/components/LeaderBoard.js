import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Media, Card, Button, Input, Row, Col, CardBody, CardTitle, CardHeader } from 'reactstrap';
import "../styles/App.css" 

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
                    <Col sm="8" md="8">
                      <Card>
                        <CardHeader style={{textAlign: "left"}}>
                          <img src= {item.avatarURL} width= "50px" alt="" /> { " "}
                          <span style={{fontWeight: 'bold'}}>{item.name}</span>
                        </CardHeader>
                        <CardBody>
                          <Row> 
                          </Row>
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

                        </CardBody>
                      </Card>
                    </Col>
                    <Col sm="3" md="3">
                      <Card>
                        <CardHeader>
                          Score
                        </CardHeader>
                        <CardBody>
                          <div className= "circular-label">
                            <div className="circle-txt">{item.questionsNo + item.answersNo}</div>
                          </div>

                        </CardBody>
                      </Card>
                      
                        
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
    console.log(leaderboards)

  return {
    leaderboards
  }
}

export default connect(
  mapStateToProps,
)(LeaderBoard);
