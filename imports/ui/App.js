import React, { Component } from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';

import { Consumer, Provider } from '../context/RootContext';
import Home from './Home';
import LoginScreen from './LoginScreen';

export default class App extends Component {
  render() {
    return (
      <Provider>
        <Jumbotron>
          <Grid bsClass="container">
            <Consumer>
              {context => {
                const { user } = context.state;

                return user ? <Home /> : <LoginScreen />
              }}
            </Consumer>
          </Grid>
        </Jumbotron>
      </Provider>
    )
  }
}
