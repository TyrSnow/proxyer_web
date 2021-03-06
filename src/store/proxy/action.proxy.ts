import {
  message,
} from 'antd';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import * as Immutable from 'immutable';
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
        let activeId = state.getIn(['proxy', 'active_id']);
        // 判断是不是有用户定义顺序
        const config = state.getIn(['auth', 'config']);
        if (!activeId && config && config.proxySort && config.proxySort[0]) {
          activeId = config.proxySort[0];
        }
        const list = resp.data.data;
        if (list.length > 0) {
          const filtActive = list.filter((item: ProxyInfo) => item._id === activeId);
          if (filtActive.length === 0) {
            dispatch(setActive(list[0]._id));
          } else {
            dispatch(setActive(activeId));
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
    ).catch(
      err => dispatch(updateProxyStatus(activeId as string, PROXY_STATUS.SYNCING_ERROR)),
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
    ).catch(err => {
      message.error(err.message);
      return dispatch(updateProxyStatus(activeId as string, PROXY_STATUS.STOP));
    });
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
  port: number,
  proxyId?: string,
): ThunkAction<Promise<any>, AppStore, any, any> {
  return (dispatch, getState) => {
    return axios.post(`/api/proxy`, {
      name,
      port,
      proxyId,
    }).then(
      (resp) => {
        const store = getState();
        let list = store.getIn(['proxy', 'list']);
        list = list.unshift(Immutable.fromJS(resp.data.data));
        dispatch(updateList(list));
        return dispatch(setActive(resp.data.data._id));
      }
    );
  }
}

export function deleteProxy(
  proxyId?: string,
): ThunkAction<Promise<any>, AppStore, any, any> {
  return (dispatch, getState) => {
    return axios.delete(`/api/proxy/${proxyId}`).then(resp => {
      // 直接重新加载列表
      return dispatch(loadList());
    });
  };
}