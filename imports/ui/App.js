import React, { Component } from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';

import { Provider } from '../context/RootContext';
import Home from './Home';

export default class App extends Component {
  render() {
    const user = null;

    return (
      <Provider>
        <Jumbotron>
          <Grid bsClass="container">
            <Home />
          </Grid>
        </Jumbotron>
      </Provider>
    )
  }
}
