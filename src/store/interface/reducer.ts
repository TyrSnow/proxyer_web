import * as Immutable from 'immutable';
import * as TYPES from './actionType';

const initialState = Immutable.fromJS({});

export default (state = initialState, action: any) => {
  switch (action.type) {
    case TYPES.UPDATE_INTERFACE_LIST:
      return state.set(action.proxyId, action.list);

    default:
      return state;
  }
}