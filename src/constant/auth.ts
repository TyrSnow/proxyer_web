export enum AUTH_STATE {
  INIT = 0,
  SOLVING,
  REGISTING,
  LOGING,
  LOGGED,
  UNLOGED,
}

export enum AUTH_TYPE {
  SHARE_GUEST = -1,
  USER = 0,
  ADMIN,
  ROOT,
}