import * as Immutable from 'immutable';
import * as TYPES from './actionType';

const initialState = Immutable.fromJS({
  config: {},
});

export default (state = initialState, action: any) => {
  switch (action.type) {
    case TYPES.UPDATE_CONFIG:
      return state.set('config', action.config);
    default:
      return state;
  }
}