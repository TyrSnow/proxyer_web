import { Action } from 'redux';
import { ProxyInfo, ProxyDetail, Host } from '../../definition/proxy';

export interface ProxyAction extends Action {
  list: ProxyInfo[]
  detail: ProxyDetail
  activeId: string
  proxyId: string
  status: number
  index: number
  host: Host
}
