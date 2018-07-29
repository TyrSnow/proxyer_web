import * as Immutable from 'immutable';
import axios from 'axios';
import * as TYPES from './actionType';
import { AuthAction } from './action.d';
import { AUTH_STATE } from '../../constant/auth';

const initialState = Immutable.Map({
  state: AUTH_STATE.INIT,
  initial: false,
  token: undefined,
  name: '',
  head: '',
});

export default (state = initialState, action: AuthAction) => {
  switch (action.type) {  
    case TYPES.REGIST:
      return state.set('state', AUTH_STATE.REGISTING);

    case TYPES.LOGING:
      return initialState.set('state', AUTH_STATE.LOGING);

    case TYPES.CLEAR_AUTH:
      delete localStorage.token;
      delete axios.defaults.headers.common.authorization;
      return initialState.merge(Immutable.Map({
        state: AUTH_STATE.UNLOGED,
      }));
    
    case TYPES.SOLVING:
      return state.set('state', AUTH_STATE.SOLVING);

    case TYPES.UPDATE_USER:
      // 更新下拦截器
      axios.defaults.headers.common.authorization = `Bearer ${action.user.token}`;

      // 存localStorage里
      localStorage.token = action.user.token;
      
      return state.merge(Immutable.Map(Object.assign(
        {
          state: AUTH_STATE.LOGGED,
          isLogIn: true,
        },
        action.user
      )));
      
    default:
      return state;
  }
};
