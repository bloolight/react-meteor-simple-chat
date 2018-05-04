import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class UsersDropdown extends Component {
  render() {
    return (
      <DropdownButton title={this.props.title} id="users dropdown">
        <MenuItem eventKey="1">User 1</MenuItem>
        <MenuItem eventKey="2">User 2</MenuItem>
        <MenuItem eventKey="3">User 3</MenuItem>
      </DropdownButton>
    );
  }
}

UsersDropdown.propTypes = {
  title: PropTypes.string.isRequired
};

export default UsersDropdown;
