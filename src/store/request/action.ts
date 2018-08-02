import axios from 'axios';
import * as TYPES from './actionType';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { AppStore } from '../index.d';

export function updateRequest(
  proxyId: string,
  lastModify: string,
  list: any[],
) {
  return {
    type: TYPES.UPDATE_REQUEST_LIST,
    proxyId,
    lastModify,
    list,
  };
}

export function fetchRequest(
  proxyId: string,
  lastModify?: string,
): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch, getState) => {
    return axios.get(`/api/request`, {
      params: {
        proxy_id: proxyId,
        last_modify: lastModify,
      },
    }).then(
      resp => dispatch(updateRequest(proxyId, resp.data.data.last_modify, resp.data.data.list)),
    );
  }
}