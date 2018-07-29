import * as Immutable from 'immutable';
import * as TYPES from './actionType';
import { CommandAction } from './action.d';

const initialState = Immutable.Map({
  trigger_count: 0,
});

function applyHandler(state: Immutable.Map<string, any>, name: string, payload: any): Immutable.Map<string, any> {
  const handler = state.get(name);
  if (handler) {
    handler(payload);
    return state.set(name, handler).set('trigger_count', state.get('trigger_count') + 1);
  }
  console.debug('Try to trigger unexist command: ', name, '; payload: ', payload);
  return state;
}

export default (state = initialState, action: CommandAction) => {
  switch (action.type) {
    case TYPES.REGIST:
      return state.set(action.name, action.handler);
      
    case TYPES.TRIGGER:
      return applyHandler(state, action.name, action.payload);
    
    case TYPES.RELEASE:
      return state.delete(action.name);

    default:
      return state;
  }
}