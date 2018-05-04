import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Alert, Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

import { WithRootContext } from '../context/WithContext';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      alertVisible: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
  }

  getValidationState() {
    const length = this.state.username.length;
    if (length === 0) { return null; }

    return length >= 5 ? 'success' : 'error';
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
    this.handleDismiss();
  }

  handleDismiss() {
    this.setState({ alertVisible: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    const validation = this.getValidationState();

    if (validation !== 'success') {
      this.setState({ alertVisible: true });
      return;
    }

    const { actions: {handleLogin} } = this.props.context;
    handleLogin(this.state.username);
  }

  renderAlert() {
    return (
      this.state.alertVisible
        ? <Alert bsStyle="warning" onDismiss={this.handleDismiss}>
            <h4>Username not valid</h4>
            <p>
              Please pick a username with at least 5 characters in length
            </p>
            <p>
              <Button onClick={this.handleDismiss} type="submit">Close</Button>
            </p>
          </Alert>
        : null
    )
  }

  render() {
    return (
      <div className="login-form">
        <h2>Simple Chat App (with React and Meteor)</h2>
        <br />

        { this.renderAlert() }

        <form onSubmit={this.handleSubmit}>
          <FormGroup
            controlId="formLogin"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Please choose your screen name</ControlLabel>
            <FormControl
              bsSize="sm"
              type="text"
              value={this.state.username}
              placeholder="Enter text"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <Button type="submit" bsStyle="primary">Submit</Button>
        </form>
      </div>
    );
  }
}

LoginScreen.propTypes = {
  context: PropTypes.object
}

export default WithRootContext(LoginScreen);
