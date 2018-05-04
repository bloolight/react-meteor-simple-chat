import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const BackToChatsButton = (props) => {
  return (
    <Link to="/" {...props}>
      <Button bsStyle="link">
        Go back to chat list
      </Button>
    </Link>
  );
};

export default BackToChatsButton;
