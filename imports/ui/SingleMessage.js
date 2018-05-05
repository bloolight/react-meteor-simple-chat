import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

import { WithRootContext } from '../context/WithContext';

const SingleMessage = props => {
  const { message } = props;
  const { state: { user } } = props.context;
  return (
    <React.Fragment>
      <p className='message-text'>
        <Badge pullRight={message.userId === user._id}>{ message.message }</Badge>
      </p>
      <div className="clearfix"></div>
    </React.Fragment>
  );
};

SingleMessage.propTypes = {
  message: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired
};

export default WithRootContext(SingleMessage);
