import React, { Component } from 'react';
import { toast } from 'react-toastify';

import * as UsersApi from '../api/users';

const Context = React.createContext();

export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(screenName) {

    const user = UsersApi.findUserByUsername(screenName);

    if (user) {
      return this.setState({ user });
    }

    UsersApi.createUser(screenName, (err, id) => {
      if (err) {
        return toast.error('There was an error');
      }

      const newUser = UsersApi.findUser(id);
      return this.setState({ user: newUser });
    })
  }

  handleLogout() {
    const user = null;
    this.setState({user});
  }

  render() {
    return (
      <Context.Provider value={{
        state: this.state,
        actions: {
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout
        }
      }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;
