import * as Immutable from 'immutable';
import * as TYPES from './actionType';

const initialState = Immutable.fromJS({

});

export default (state = initialState, action: any) => {
  switch (action.type) {
    case TYPES.REGIST_COMMAND:
      return state;
    default:
      return state;
  }
}