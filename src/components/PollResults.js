import React from 'react';
import { Progress, Badge, Row, Col, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import "../styles/App.css"

function PollResult(props) {

  const handleClick = e => {
    props.history.push("/")
  }

  const UserBadge = () => {
    return <Badge color="primary">Your Vote</Badge>
  }

  const { user, question } = props
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  const userVote = user.answers[question.id];
  let option1 = "secondary",
    option2 = "secondary";
  if (optionOneVotes > optionTwoVotes) {
    option1 = "success";
  } else if (optionTwoVotes > optionOneVotes) {
    option2 = "success";
  }

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>
        Results
      </h3>
      <p style={{ fontWeight: 'bold' }}>
        Would you rather
        </p>
      <div className= "resultCard">
        <Row>
          <Col>
            <p style={{ fontWeight: "bold" }}>{question.optionOne.text}</p>
            <Progress color={option1} value={((optionOneVotes / totalVotes) * 100).toFixed(2)}>
              {((optionOneVotes / totalVotes) * 100).toFixed(2)}
            </Progress>

          </Col>
          <Col>
            {
              userVote === "optionOne" ? <UserBadge /> : null
            }
          </Col>
        </Row>
        <div>{optionOneVotes} out of {totalVotes} votes</div>
      </div>
      <div className="resultCard">
        <Row>
          <Col>
            <p style={{ fontWeight: "bold" }}>{question.optionTwo.text}</p>
            <Progress color={option2} value={((optionTwoVotes / totalVotes) * 100).toFixed(2)}>
              {((optionTwoVotes / totalVotes) * 100).toFixed(2)}
            </Progress>

          </Col>
          <Col>
            {
              userVote === "optionTwo" ? <UserBadge /> : null
            }
          </Col>
        </Row>
        <div>{optionTwoVotes} out of {totalVotes} votes</div>
      </div>
      
      <Button onClick={handleClick}>Back</Button>

    </div>

  )

}

function mapStateToProps({ users, authUser }) {
  const user = users[authUser.value];
  return {
    user
  }
}

export default withRouter(connect(
  mapStateToProps
)(PollResult))