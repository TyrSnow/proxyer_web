import { Store } from 'redux';
import * as Immutable from 'immutable';
import { ProxyInfo } from '../definition/proxy';
import { AUTH_STATE } from '../constant/auth';

export interface ProxyState {
  list_loading: boolean
  list: ProxyInfo[]
}

export interface AuthState {
  state: AUTH_STATE
  initial: boolean
  user: string
  head: string
  token: string
}

export interface AppState {
  auth: Map<String, AuthState>
  proxy: Map<String, ProxyState>
}

export interface AppStore extends Immutable.Map<String, AppState> {

}
