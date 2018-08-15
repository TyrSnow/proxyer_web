import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import axios from 'axios';
import { AppStore } from "../index.d";
// import * as TYPES from './actionType';
import { setProxyDetail } from './action.proxy';

export function createPattern(
  pattern: any,
  proxyId?: string,
): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch, getState) => {
    const activeId = proxyId || getState().getIn(['proxy', 'detail', '_id']);
    
    return axios.post(`/api/proxy/${activeId}/patterns`, pattern).then(
      resp => dispatch(setProxyDetail(activeId, resp.data.data)),
    );
  }
}

export function editPattern(
  pattern: any,
  patternId: string,
  proxyId?: string,
): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch, getState) => {
    const activeId = proxyId || getState().getIn(['proxy', 'detail', '_id']);
    
    return axios.put(`/api/proxy/${activeId}/patterns/${patternId}`, pattern).then(
      resp => dispatch(setProxyDetail(activeId, resp.data.data)),
    );
  }
}

export function deletePattern(
  patternId: string,
  proxyId?: string,
): ThunkAction<Promise<Action>, AppStore, any, any> {
  return (dispatch, getState) => {
    const activeId = proxyId || getState().getIn(['proxy', 'detail', '_id']);
    
    return axios.delete(`/api/proxy/${activeId}/patterns/${patternId}`).then(
      resp => dispatch(setProxyDetail(activeId, resp.data.data)),
    );
  }
}
