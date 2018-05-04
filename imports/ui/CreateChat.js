import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

class CreateChat extends Component {
  render() {
    return (
      <React.Fragment>
        <Button bsStyle="primary">
          Cancel
        </Button>
        <Link to="/">
          <Button>
            Cancel
          </Button>
        </Link>
      </React.Fragment>
    );
  }
}

export default CreateChat;
