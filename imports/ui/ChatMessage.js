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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ message: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addMessage(this.state.message);
    this.setState({ message: ''});
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
            onChange={this.handleChange}
            className="message-input"
          />
        </FormGroup>
        <Button type="submit">Send message</Button>
      </Form>
    );
  }
}

ChatMessage.propTypes = {
  addMessage: PropTypes.func.isRequired
};

export default ChatMessage;
