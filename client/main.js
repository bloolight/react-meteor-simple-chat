import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import App from '../imports/ui/App.js';

// Main entry point, for the client part
Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
