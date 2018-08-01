import { Action } from 'redux';

export interface RequestAction extends Action {
  proxyId: string
  lastModify: string
  list: any[]
}
