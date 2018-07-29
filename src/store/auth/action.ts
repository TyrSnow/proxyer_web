import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { AppStore, AuthState } from '../index.d';
import * as TYPES from './actionType';

export function updateUser(user: AuthState): any {
  return {
    type: TYPES.UPDATE_USER,
    user
  };
}

export function clearAuth(): any {
  return {
    type: TYPES.CLEAR_AUTH,
  };
}

export function regist(
  name: string,
  password: string,
): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch) => {
    dispatch({
      type: TYPES.REGIST,
    });
    return axios.post('/api/users', {
      name,
      password,
    }).then(
      resp => dispatch(updateUser(resp.data.data))
    );
  };
}

export function logIn(
  user: string,
  password: string,
  remember: boolean = false
): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch) => {
    dispatch({
      type: TYPES.LOGING,
    });
    return axios.post('/api/session', {
      user,
      password,
      remember,
    }).then(
      resp => dispatch(updateUser(resp.data.data),
    ));
  };
}

export function solveAuth(
  token: string,
): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch) => {
    dispatch({
      type: TYPES.SOLVING,
    });
    return axios.get('/api/session', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(
      resp => dispatch(updateUser(resp.data.data))
    ).catch(err => dispatch(clearAuth()));
  };
}

export function modifyPassword(
  oldPassword: string,
  password: string,
): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch) => {
    return axios('/api/session/password', {
      method: 'put',
      data: {
        oldPassword,
        password,
      },
    }).then((resp) => dispatch(updateUser(resp.data.data)));
  };
}