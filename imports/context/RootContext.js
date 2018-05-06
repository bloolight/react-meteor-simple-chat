/**
 * Main Context API, containing login/ logout methods, as well user state
 */

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
    this.setUser = this.setUser.bind(this);
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
      this.setUser(newUser);
    })
  }

  handleLogout() {
    const user = null;
    this.setState({user});
  }

  setUser(user) {
    this.setState({ user });
  }

  render() {
    return (
      <Context.Provider value={{
        state: this.state,
        actions: {
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          setUser: this.setUser
        }
      }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;
