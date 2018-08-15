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
}

export enum HANDLE_TYPE {
  NONE = 0,
  MOCK,
  BLOCK,
}

export const HANDLE_TYPE_LABEL = {
  [HANDLE_TYPE.NONE]: '不处理',
  [HANDLE_TYPE.MOCK]: 'Mock',
  [HANDLE_TYPE.BLOCK]: '断开',
}

export enum MOCK_TYPE {
  JSON = 0,
  HTML,
  TEXT,
  JSONP,
  JS,
}

export const MOCK_TYPE_LABEL = {
  [MOCK_TYPE.JSON]: 'json',
  [MOCK_TYPE.HTML]: 'html',
  [MOCK_TYPE.TEXT]: '文本',
  [MOCK_TYPE.JSONP]: 'jsonp',
  [MOCK_TYPE.JS]: 'js',
}

export const MOCK_STATUS = [
  100, 101, 102,
  200, 201, 202, 203, 204, 205, 206, 207,
  300, 301, 302, 303, 304, 305, 306, 307,
  400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 421, 422, 424, 425, 426, 449,
  500, 501, 502, 503, 504, 505, 506, 507, 509, 510,
];
