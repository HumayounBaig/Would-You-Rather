import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { connect } from 'react-redux';
import { handleSaveQuestionAnswer } from '../redux/actions/users';

function ExpandedPoll(props) {
  const [isChecked, setIsChecked] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (isChecked !== "") {
      const { authUser, question, handleSaveQuestionAnswer } = props;
      handleSaveQuestionAnswer(authUser.value, question.id, isChecked)
    }
  }


  const handleChange = (e) => setIsChecked(e.target.value);
  const { question } = props;
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Would you rather</Label>
          <br />
          <Label check>
            <Input 
              type="radio" 
              name="radio1" 
              value="optionOne" 
              checked={isChecked === "optionOne"}
              onChange={handleChange}
            />{' '}
            {question.optionOne.text}
          </Label>
          <div className="text-center muted">OR</div>
          <Label check>
            <Input 
              type="radio" 
              name="radio1" 
              value="optionTwo" 
              checked={isChecked === "optionTwo"}
              onChange={handleChange}
            />{' '}
            {question.optionTwo.text}
          </Label>
          <br/>
          <Button color="success" >Submit</Button>
        </FormGroup>
      </Form>
    </div>

  )

}

function mapStateToProps ({ authUser}, {match}){
  return {
    authUser
  }
}


export default connect(
  mapStateToProps,
  {handleSaveQuestionAnswer}
)(ExpandedPoll);