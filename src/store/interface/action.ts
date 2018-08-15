import axios from 'axios';
import * as TYPES from './actionType';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { AppStore } from '../index.d';

export function updateProxyInterface(
  proxyId: string,
  list: any[],
) {
  return {
    type: TYPES.UPDATE_INTERFACE_LIST,
    list,
  };
}

export function loadProxyInterfaceList(
  proxyId: string,
): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch, getState) => {
    return axios.get('/api/interface', {
      params: {
        proxyId,
      },
    }).then(
      resp => dispatch(updateProxyInterface(proxyId, resp.data.data)),
    );
  }
}