import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { Host } from '../../definition/proxy';

import { AppStore } from '../index.d';
import * as TYPES from './actionType';

export function updateHostList(list: Host[]) {
  return {
    type: TYPES.UPDATE_HOST_LIST,
    list,
  };
}

export function updateHost(hosts: Host[], hostId: string, host: Host) {
  const index = hosts.findIndex((value: any) => {
    return value.get('_id') === hostId;
  });
  return {
    type: TYPES.UPDATE_HOST,
    index,
    host,
  };
}

export function appendHostList(host: Host) {
  return {
    type: TYPES.APPEND_HOST,
    host,
  };
}

export function setActiveHost(hostId: string): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch, getState) => {
    const state = getState();
    const proxyId = state.getIn(['proxy', 'detail', '_id']);
    return axios.post(`/api/proxy/${proxyId}/hosts/${hostId}/active`).then((resp) => {
      return dispatch(updateHostList(resp.data.data));
    });
  }
}

export function setHostState(
  hostId: string,
  enable: boolean,
): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch, getState) => {
    const state = getState();
    if (enable) {
      return axios.delete(`/api/hosts/${hostId}/disable`).then((resp) => {
        const hosts = state.getIn(['proxy', 'detail', 'hosts']);
        return dispatch(updateHost(hosts, hostId, resp.data.data));
      });
    }
    return axios.post(`/api/hosts/${hostId}/disable`).then((resp) => {
      const hosts = state.getIn(['proxy', 'detail', 'hosts']);
      return dispatch(updateHost(hosts, hostId, resp.data.data));
    });
  }
}

export function updateHostDetail(
  hostId: string,
  target: string,
  name: string,
  changeOrigin: boolean,
  enable: boolean,
): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch, getState) => {
    const hosts = getState().getIn(['proxy', 'detail', 'hosts'])
    return axios.put(`/api/hosts/${hostId}`, {
      target,
      name,
      changeOrigin,
      disable: enable ? undefined : true,
    }).then((resp) => dispatch(updateHost(hosts, hostId, resp.data.data)));
  };
}

export function createHost(
  target: string,
  name?: string,
  changeOrigin?: boolean,
  enable?: boolean,
): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch, getState) => {
    const state = getState();
    const proxyId = state.getIn(['proxy', 'detail', '_id']);
    return axios.post(`/api/proxy/${proxyId}/hosts`, {
      target,
      name,
      changeOrigin,
      disable: enable ? undefined : true,
    }).then((resp) => dispatch(appendHostList(resp.data.data)));
  }
}

export function removeHost(
  hostId: string,
): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch, getState) => {
    const state = getState();
    const proxyId = state.getIn(['proxy', 'detail', '_id']);
    return axios.delete(`/api/proxy/${proxyId}/hosts/${hostId}`).then(
      (resp) => dispatch(updateHostList(resp.data.data.hosts)),
    );
  }
}
