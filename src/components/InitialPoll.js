import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap'

function InitialPoll({ question, isAnswered }) {
  const [viewPoll, setViewPoll] = useState(false);

  const handleClick = e => {
    setViewPoll(!viewPoll)
  }

  if (viewPoll) {
    return <Redirect push to={`/questions/${question.id}`} />
  }

  return (
    <div>
      <p>Would you rather</p>
      <p className="text-center">{question.optionOne.text}...</p>
      <br />
      <Button color="primary" onClick={handleClick}>
        {
          isAnswered ? 'Results' : 'Answer Poll'
        }
      </Button>
    </div>

  )

}

InitialPoll.propTypes = {
  question: PropTypes.object.isRequired,
  isAnswered: PropTypes.bool.isRequired,
};

export default InitialPoll