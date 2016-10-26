import React from 'react';
import { render } from 'react-dom';
import createStore from './redux/store';
import ApiClient from './helpers/ApiClient';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import { Router, browserHistory } from 'react-router';
import getRoutes from './routes';

const client = new ApiClient();
const store = createStore(browserHistory, client);
if (!global.Intl) {
  require('intl');
}
render(
  <Provider store={store}>
    <Router render={(props) =>
          <ReduxAsyncConnect {...props} helpers={{ client }}
            filter={item => !item.deferred}
          />
        } history={browserHistory}
    >
      {getRoutes()}
    </Router>
  </Provider>,
  document.getElementById('root')
);
