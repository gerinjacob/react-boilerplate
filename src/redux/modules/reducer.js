import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import app from './app';

export default combineReducers({
  reduxAsyncConnect,
  app
});
