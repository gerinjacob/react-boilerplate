import React from 'react';
import { Route, Redirect } from 'react-router';
import {
    App
  } from './containers';

export default () =>
  <Route path="/" component={App}>
    <Redirect from="*" to="/" />
  </Route>;
