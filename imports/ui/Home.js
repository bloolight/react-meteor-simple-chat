import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ChatContainer from './ChatContainer';
import Chat from './Chat';
import CreateChat from './CreateChat';
import LoginScreen from './LoginScreen';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={ChatContainer} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/chat/:id' component={Chat} />
          <Route path='/create' component={CreateChat} />
          <Route component={LoginScreen} />
        </Switch>
      </BrowserRouter>
    )
  }
}
