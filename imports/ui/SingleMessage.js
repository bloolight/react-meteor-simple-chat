import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

const SingleMessage = props => {
  const { message } = props;
  return (
    <React.Fragment>
      <p className='message-text'>
        <Badge pullRight={message._id === 'm4x3tsoNjoKb26sDJ'}>{ message.message }</Badge>
      </p>
      <div className="clearfix"></div>
    </React.Fragment>
  );
};

SingleMessage.propTypes = {
  message: PropTypes.object.isRequired
};

export default SingleMessage;
