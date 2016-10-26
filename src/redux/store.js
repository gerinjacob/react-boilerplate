import { applyMiddleware, createStore as _createStore } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import reducer from './modules/reducer';

export default function createStore(history, client, data) {
  let middleware;
  if (__DEVELOPMENT__) {
    const logger = require('redux-logger');
    middleware = [logger(), createMiddleware(client)];
  } else {
    middleware = [createMiddleware(client)];
  }
  const finalCreateStore = applyMiddleware(...middleware)(_createStore);

  return finalCreateStore(reducer, data);
}
