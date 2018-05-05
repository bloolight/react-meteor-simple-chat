import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const UsersDropdown = (props) => {
  const disabled = props.disable;

  return (
    <DropdownButton
      id="users-dropdown"
      title={props.title}
      onSelect={props.handleSelect}>
      {props.users.map(user => {
        return (
          <MenuItem
            key={user._id}
            eventKey={user._id}
            disabled={disabled.includes(user._id)}
          >
            {user.username}
          </MenuItem>
        )
      })}
    </DropdownButton>
  );
}

UsersDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired,
  disable: PropTypes.array
};

export default UsersDropdown;
