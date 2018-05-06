import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';

class ChatMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messageId: null,
      editing: false
    }

    this.clearAll = this.clearAll.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
  }

  clearAll() {
    this.setState({
      message: '',
      editing: false,
      messageId: null
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.message) {
      return this.clearAll();
    }

    this.setState({
      editing: true,
      message: nextProps.message.message,
      messageId: nextProps.message._id
    });
  }

  handleChange(e) {
    this.setState({ message: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addMessage(this.state.message);
    this.clearAll();
  }

  handleDelete() {
    this.props.deleteMessage(this.state.messageId);
  }

  renderDeleteButton() {
    return (
      <Button
        type="button"
        bsStyle="danger"
        onClick={this.handleDelete}>
        Delete
      </Button>
    )
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
        <Button type="submit" disabled={this.state.message === ''}>Send message</Button>
        { this.state.editing ? this.renderDeleteButton() : null }
      </Form>
    );
  }
}

ChatMessage.propTypes = {
  addMessage: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func,
  message: PropTypes.object
};

export default ChatMessage;
