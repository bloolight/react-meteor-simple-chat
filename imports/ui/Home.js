import React, { Component } from 'react';

import { Consumer } from '../context/RootContext';
import ChatContainer from './ChatContainer';
import LoginScreen from './LoginScreen';

export default class App extends Component {
  render() {
    return (
      <Consumer>
        {context => {
          const { user } = context.state;

          return (
            user ? <ChatContainer /> : <LoginScreen />
          )
        }}
      </Consumer>
    )
  }
}
