/**
 * Basically, the route setup used in the whole application
 */
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ChatContainer from './ChatContainer';
import Chat from './Chat';
import CreateChat from './CreateChat';
import LoginScreen from './LoginScreen';
import UserDetails from './UserDetails';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={ChatContainer} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/chats/:id' component={Chat} />
          <Route path='/create' component={CreateChat} />
          <Route path='/users/:id' component={UserDetails} />
          <Route component={LoginScreen} />
        </Switch>
      </BrowserRouter>
    )
  }
}
