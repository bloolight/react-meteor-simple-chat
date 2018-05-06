/**
 * Convinient HOC for exposing Root Context to the child components(consumers)
*/

import React from 'react';

import { Consumer } from './RootContext';

export const WithRootContext = (Component) => {
  const WithRootContext = (props) => (
    <Consumer>
      {context => <Component {...props} context={context} />}
    </Consumer>
  );

  WithRootContext.displayName = `WithRootContext(${Component.displayName || Component.name}`;

  return WithRootContext;
}
