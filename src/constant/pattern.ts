export enum PATTERN_TYPE {
  PROXY = 0,
  THROTTLE,
}

export enum THROTTLE_TYPE {
  NONE = 0,
  SPEED,
  DELAY,
  PAUSE,
}

export const THROTTLE_TYPE_LABEL = {
  [THROTTLE_TYPE.NONE]: '不处理',
  [THROTTLE_TYPE.SPEED]: '限速',
  [THROTTLE_TYPE.DELAY]: '延迟',
  [THROTTLE_TYPE.PAUSE]: '暂停',
}
