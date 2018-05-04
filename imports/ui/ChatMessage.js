import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';

class ChatMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      editing: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.info('this.state.message', this.state.message);
  }

  render() {
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup controlId="formInlineName">
          <FormControl
            type="text"
            placeholder="Enter a message"
            autoComplete="off"
            value={this.state.message}
          />
        </FormGroup>
        <Button type="submit">Send message</Button>
      </Form>
    );
  }
}

ChatMessage.propTypes = {

};

export default ChatMessage;
