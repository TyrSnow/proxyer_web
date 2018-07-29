import * as TYPES from './actionType';

export function regist(name: string, handler: any): any {
  return {
    type: TYPES.REGIST,
    name,
    handler,
  };
}

export function release(name: string, handler: any): any {
  return {
    type: TYPES.RELEASE,
    name,
    handler,
  };
}

export function trigger(name: string, payload?: any): any {
  return {
    type: TYPES.TRIGGER,
    name,
    payload,
  };
}
