import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const BackToChatsButton = () => {
  return (
    <Link to="/">
      <Button bsStyle="link">
        Go back to chats
      </Button>
    </Link>
  );
};

export default BackToChatsButton;
