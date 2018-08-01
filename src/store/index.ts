import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import auth from './auth/reducer';
import proxy from './proxy/reducer';
import command from './command/reducer';
import request from './request/reducer';

const store = createStore(
  combineReducers({ auth, proxy, command, request }),
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
