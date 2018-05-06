import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { withTracker } from 'meteor/react-meteor-data';

import { WithRootContext } from '../context/WithContext';
import * as UsersApi from '../api/users';
import BackToChatsButton from './BackToChatsButton';

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      email: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    const { currentUser } = nextProps;
    if (currentUser) {

      return {
        username: currentUser.username,
        name: currentUser.name || '',
        email: currentUser.email || ''
      };
    }

    return null;
  }

  handleChange(type, e) {
    this.setState({
      [type]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.username) {
      return;
    }

    UsersApi.editDetails(
      this.props.context.state.user._id,
      this.state.username,
      this.state.name,
      this.state.email,
      err => {
        if (err) {
          return toast.error('There was an error');
        }

        const updatedUser = UsersApi.findUserByUsername(this.state.username);
        this.props.context.actions.setUser(updatedUser);
        toast.success('User details updated');
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <BackToChatsButton className="pull-right" />
        <h2>Update user details</h2>
        <br/>
        <form className="user-details" onSubmit={this.handleSubmit}>
          <FormGroup controlId="formControlsScreenName">
            <ControlLabel>Enter screen name</ControlLabel>
            <FormControl
              type="text"
              value={this.state.username}
              placeholder="Enter screen name"
              onChange={this.handleChange.bind(null, 'username')}
              required
            />
          </FormGroup>
          <FormGroup controlId="formControlsFullName">
            <ControlLabel>Enter name</ControlLabel>
            <FormControl
              type="text"
              value={this.state.name}
              placeholder="Enter name"
              onChange={this.handleChange.bind(null, 'name')}
            />
          </FormGroup>
          <FormGroup controlId="formControlsEmail">
            <ControlLabel>Enter email</ControlLabel>
            <FormControl
              type="email"
              value={this.state.email}
              placeholder="Enter email"
              onChange={this.handleChange.bind(null, 'email')}
            />
          </FormGroup>

          <Button bsStyle="primary" type="submit">
            Save Details
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

UserDetails.propTypes = {
  history: PropTypes.object.isRequired,
  users: PropTypes.array,
  context: PropTypes.object
}

export default withTracker((props) => {
  const { match } = props;
  return {
    currentUser: UsersApi.findUser(match.params.id)
  }
})(WithRootContext(UserDetails));
