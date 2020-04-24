import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, CardHeader, Card, Button, Input, Row, Col, CardBody } from 'reactstrap';
import { addQuestion } from '../redux/actions/questions'
import { Redirect } from 'react-router-dom';

class CreatePoll extends Component {

  state = {
    isSubmit: false,
    isLoading: false,
    option1: '',
    option2: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const {authUser, addQuestion} = this.props
    const {option1, option2} = this.state

    new Promise((res, rej) => {
      this.setState({isLoading: true});
      const data = {
        optionOneText: option1,
        optionTwoText: option2,
        author: authUser.value
      }
      addQuestion(data);
      setTimeout(() => res('success'), 1000);
    }).then(()=>{
      this.setState({
        option1: '',
        option2: '',
        isSubmit: true
      })
    })
  }

  render() {
    const disabled = this.state.option1 === "" || this.state.option2 === ""

    if(this.state.isSubmit){
      return <Redirect to = '/' />
    }
    return (
      <div>
        <Row>
          <Col sm="12" className="col-centered" md={{ size: 5, offset: 4 }}>
            <Card body>
              <CardHeader style={{ textAlign: 'left' }}>
                <span style={{ fontWeight: 'bold' }}>
                  Create a New Poll
                </span>  

                </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <strong>Would you rather</strong>
                    <Form onSubmit={this.handleSubmit}>
                      <Input 
                        id="option1"
                        placeholder= "Enter first option"
                        value= {this.state.option1}
                        onChange={this.handleChange}
                        required
                      /> <br/>
                      <Input 
                        id="option2"
                        placeholder= "Enter second option"
                        value= {this.state.option2}
                        onChange={this.handleChange}
                        required
                      /> <br/>
                      <Button disabled={disabled} color="success" >
                        Submit
                      </Button>
                    </Form>
                   
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  }
}

export default connect(
  mapStateToProps,
  { addQuestion }
)(CreatePoll);
