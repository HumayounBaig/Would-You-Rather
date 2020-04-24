import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, CardBody, CardHeader } from 'reactstrap';
import "../styles/App.css" 
import PropType from 'prop-types'

function LeaderBoard(props){

  const medalColor = ['gold', 'silver', 'saddlebrown']

  const { leaderboards } = props

  return (
    <div>
      <Row>
        <Col sm="12" className="col-centered" >
          {
            leaderboards.map((item, index) => (
              <Card body key={item.id} className="container">
                <div style={{backgroundColor: `${medalColor[index]}`}} className="triangle">
                </div>

                <CardBody>
                  <Row>
                    <Col sm="9" md="9">
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

LeaderBoard.propType = {
  leaderboards: PropType.array.isRequired
};

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
