import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Alert, Button, Checkbox, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { withTracker } from 'meteor/react-meteor-data';

import { WithRootContext } from '../context/WithContext';
import * as UsersApi from '../api/users';
import { createChatRoom } from '../api/chatRooms';
import BackToChatsButton from './BackToChatsButton';

class CreateChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: '',
      members: [],
      alertVisible: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.isValidChatMembers = this.isValidChatMembers.bind(this);
  }

  handleChange(type, e) {
    this.setState({
      [type]: e.target.value
    })
  }

  handleCheckbox(e) {
    const { checked, value } = e.target;
    const { members } = this.state;

    // Use set to prevent duplicates, and for easier removal
    const membersSet = new Set(members);

    if (checked) {
      membersSet.add(value);
    } else {
      membersSet.delete(value);
    }

    // Update set with selected chat members. When state gets set, in the callback validate length to remove alert
    this.setState({
      members: Array.from(membersSet)
    }, () => {
      if (this.isValidChatMembers()) {
        this.setState({ alertVisible: false });
      }
    });
  }

  handleDismiss() {
    this.setState({ alertVisible: false });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.title || !this.state.desc) {
      return;
    }

    if (!this.isValidChatMembers()) {
      this.setState({ alertVisible: true });
      return;
    }

    createChatRoom(
      this.state.title,
      this.state.desc,
      this.state.members,
      this.props.context.state.user._id,
      (err, _id) => {
        if (err) {
          return toast.error('There was an error');
        }

        this.props.history.push(`/chat/${_id}`);
      }
    );
  }

  isValidChatMembers() {
    return this.state.members.length >= 2;
  }

  renderAlert() {
    return (
      this.state.alertVisible
        ? <Alert bsStyle="warning" onDismiss={this.handleDismiss}>
            <p>
              Please select at least two chat participants
            </p>
          </Alert>
        : null
    )
  }

  render() {
    return (
      <React.Fragment>
        <BackToChatsButton className="pull-right" />
        <h2>Create New Chat</h2>
        <br/>
        { this.renderAlert() }
        <form className="create-chat-from" onSubmit={this.handleSubmit}>
          <FormGroup controlId="formControlsTitle">
            <ControlLabel>Enter chat title</ControlLabel>
            <FormControl
              type="text"
              value={this.state.title}
              placeholder="Enter title"
              onChange={this.handleChange.bind(null, 'title')}
              required
            />
          </FormGroup>
          <FormGroup controlId="formControlsDescription">
            <ControlLabel>Enter chat description</ControlLabel>
            <FormControl
              type="text"
              value={this.state.desc}
              placeholder="Enter description"
              onChange={this.handleChange.bind(null, 'desc')}
              required
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Select participants</ControlLabel>
            {this.props.users.map(u => {
              return (
                <Checkbox
                  key={u._id}
                  onChange={this.handleCheckbox}
                  value={u._id}
                >
                  {u.username}
                </Checkbox>
              )
            })}
          </FormGroup>

          <Button bsStyle="primary" type="submit">
            Create Chat
          </Button>

          <Link to="/">
            <Button>
              Cancel
            </Button>
          </Link>
        </form>
      </React.Fragment>
    );
  }
}

CreateChat.propTypes = {
  history: PropTypes.object.isRequired,
  users: PropTypes.array,
  context: PropTypes.object
}

export default withTracker(() => {
  return {
    users: UsersApi.getUsers()
  }
})(WithRootContext(CreateChat));
