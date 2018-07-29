import { UserInfo } from "./user";

export interface Host {
  _id: string
  target: string
  name?: string
  disable?: boolean
  active?: boolean
}

export interface Pattern {
  _id: string
  match: string
  server: string
  pause?: boolean
  enable?: boolean
}

export interface ProxyInfo {
  _id: string
  name: string
  desc: string
  port: string
  createdAt: string
}

export interface ProxyDetail extends ProxyInfo {
  creator: UserInfo
  hosts: Host[]
  patterns: Pattern[]
}
