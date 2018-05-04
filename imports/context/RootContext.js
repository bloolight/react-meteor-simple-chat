import React, { Component } from 'react';

const Context = React.createContext();

export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  handleLogin(user) {
    this.setState({user});
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
