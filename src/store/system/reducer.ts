import * as Immutable from 'immutable';
import * as TYPES from './actionType';
import { SystemAction } from './action.d';
import generateConfigMap from './generateConfigMap';

const initialState = Immutable.fromJS({
  configs: [],
  getConfig: () => {return;},
});

export default (state = initialState, action: SystemAction) => {
  switch (action.type) {
    case TYPES.UPDATE_CONFIG:
      return state
        .set('configs', action.configs)
        .set('configMap', generateConfigMap(action.configs));

    default:
      return state;
  }
}