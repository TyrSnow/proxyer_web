import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { AppStore } from '../index.d';
import * as TYPES from './actionType';
import { ProxyInfo, ProxyDetail } from "../../definition/proxy";
import { PROXY_STATUS } from '../../constant/proxy';

export function updateList(list: ProxyInfo[]): any {
  return {
    type: TYPES.UPDATE_LIST,
    list,
  };
}

export function loadList(): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch, getState) => {
    dispatch({
      type: TYPES.LOAD_LIST,
    });
    return axios.get('/api/proxy?all').then(
      (resp) => {
        const state = getState();
        const activeId = state.getIn(['proxy', 'active_id']);
        const list = resp.data.data;
        if (list.length > 0) {
          const filtActive = list.filter((item: ProxyInfo) => item._id === activeId);
          if (filtActive.length === 0) {
            dispatch(setActive(list[0]._id));
          }
        }
        return dispatch(updateList(resp.data.data))
      },
    );
  };
}

export function updateActiveDetail(activeId: string, detail: ProxyDetail): any {
  return {
    type: TYPES.SET_ACTIVE,
    detail,
    activeId,
  };
}

export function setActive(activeId: string): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch) => {
    dispatch({
      type: TYPES.LOAD_DETAIL,
    });
    return axios.get(`/api/proxy/${activeId}`).then(
      resp => dispatch(updateActiveDetail(activeId, resp.data.data)),
    );
  }
}

export function setProxyDetail(proxyId: string, detail: ProxyDetail): any {
  return {
    type: TYPES.SET_PROXY_DETAIL,
    proxyId,
    detail,
  };
}
export function updateProxyStatus(proxyId: string, status: PROXY_STATUS): any {
  return {
    type: TYPES.UPDATE_PROXY_STATUS,
    proxyId,
    status,
  };
}

export function syncProxyStatus(proxyId?: string): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch, getState) => {
    let activeId = proxyId;
    if (!activeId) {
      const store = getState();
      activeId = store.getIn(['proxy', 'activeId']);
    }

    dispatch(updateProxyStatus(activeId as string, PROXY_STATUS.SYNCING));
    return axios.get(`/api/server/${activeId}`).then(
      resp => dispatch(updateProxyStatus(activeId as string, resp.data.data)),
    );
  };
}

export function restartProxy(proxyId?: string): ThunkAction<Promise<Action>, AppStore, any, any>  {
  return (dispatch, getState) => {
    let activeId = proxyId;
    if (!activeId) {
      const store = getState();
      activeId = store.getIn(['proxy', 'activeId']);
    }
    
    dispatch(updateProxyStatus(activeId as string, PROXY_STATUS.SYNCING));
    return axios.put(`/api/server/${activeId}`).then(
      resp => dispatch(updateProxyStatus(activeId as string, resp.data.data)),
    );
  };
}
export function startProxy(proxyId?: string): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch, getState) => {
    let activeId = proxyId;
    if (!activeId) {
      const store = getState();
      activeId = store.getIn(['proxy', 'activeId']);
    }
    
    dispatch(updateProxyStatus(activeId as string, PROXY_STATUS.SYNCING));
    return axios.post(`/api/server/${activeId}`).then(
      resp => dispatch(updateProxyStatus(activeId as string, resp.data.data)),
    );
  };
}

export function stopProxy(proxyId?: string): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch, getState) => {
    let activeId = proxyId;
    if (!activeId) {
      const store = getState();
      activeId = store.getIn(['proxy', 'activeId']);
    }

    dispatch(updateProxyStatus(activeId as string, PROXY_STATUS.SYNCING));
    return axios.delete(`/api/server/${activeId}`).then(
      resp => dispatch(updateProxyStatus(activeId as string, resp.data.data)),
    );
  };
}

export function updateProxyDetail(
  detail: any,
  proxyId?: string,
): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch, getState) => {
    let activeId = proxyId;
    if (!activeId) {
      activeId = getState().getIn(['proxy', 'activeId']);
    }

    return axios.put(`/api/proxy/${activeId}`, detail).then(
      (resp) => dispatch(setProxyDetail(activeId as string, resp.data.data)),
    );
  }
}

export function createProxy(
  name: string,
  port: string,
): ThunkAction<Promise<any>, AppStore, any, any> {
  return (dispatch, getState) => {
    const store = getState();
    const list = store.getIn(['proxy', 'list']);

    return axios.post(`/api/proxy`, {
      name,
      port,
    }).then(
      (resp) => {
        list.unshift(resp.data.data);
        dispatch(updateList(list));
        return dispatch(setActive(resp.data.data._id));
      }
    );
  }
}