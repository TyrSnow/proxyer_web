export interface UserInfo {
  _id: string
  name: string
  head?: string
}

export interface UserAuth extends UserInfo {
  token: string
  auth: number
}
