import * as Immutable from 'immutable';
import * as TYPES from './actionType';
import { ProxyAction } from './action.d';
import { PROXY_STATUS } from '../../constant/proxy';
const initialState = Immutable.fromJS({
  list: [],
  list_initial: false,
  list_loading: false,
  detail_loading: false,
  active_id: null,
  detail: {
    patterns: [],
    hosts: [],
  },
});

function merge_detail(state: Immutable.Map<string, any>, proxyId: string, detail: any): any {
  const detailId = state.getIn(['detail', '_id']);
  console.debug('merge_detail: ', detailId, proxyId);
  if (detailId === proxyId) {
    return update_active_detail(state, proxyId, detail);
  }

  const proxyIndex = state.get('list').findIndex((item: any) => {
    return item.get('_id') === proxyId;
  });
  console.debug('merge_detail findIndex item: ', proxyIndex);
  const oriDetail = state.getIn(['list', proxyIndex]);
  const newDetail = oriDetail.merge(detail);
  return state
    .setIn(['list', proxyIndex], newDetail);
}

function update_active_detail(state: Immutable.Map<string, any>, activeId: string, detail: any): any {
  const activeIndex = state.get('list').findIndex((item: any) => {
    return item.get('_id') === activeId;
  });
  console.debug('update_active_detail findIndex item: ', activeIndex);
  const status = state.getIn(['detail', 'status']);
  detail.status = status;
  const oriDetail = state.getIn(['list', activeIndex]);
  const newDetail = oriDetail.merge(detail);
  return state
    .set('active_id', activeId)
    .setIn(['list', activeIndex], newDetail)
    .set('detail', Immutable.fromJS(detail))
    .set('detail_loading', false);
}

export default (state = initialState, action: ProxyAction) => {
  console.debug('proxy store update with: ', action);
  let activeId;
  switch (action.type) {
    case TYPES.LOAD_LIST:
      return state.set('list_loading', true).set('list_initial', true);
    
    case TYPES.LOAD_LIST_FAIL:
      return state.set('list_loading', false);

    case TYPES.UPDATE_LIST:
      return state.set('list_loading', false).set('list', Immutable.fromJS(action.list));
  
    case TYPES.LOAD_DETAIL:
      return state.set('detail_loading', true).setIn(['detail', 'status'], PROXY_STATUS.SYNCING);

    case TYPES.LOAD_DETAIL_FAIL:
      return state.set('detail_loading', false);  

    case TYPES.SET_ACTIVE:
      return update_active_detail(state, action.activeId, action.detail);
    
    case TYPES.UPDATE_HOST_LIST:
      return state.setIn(['detail', 'hosts'], Immutable.fromJS(action.list));

    case TYPES.UPDATE_HOST:
      return state.setIn(['detail', 'hosts', action.index], Immutable.fromJS(action.host));
  
    case TYPES.APPEND_HOST:
      return state.setIn(
        ['detail', 'hosts'],
        state.getIn(['detail', 'hosts']).push(Immutable.fromJS(action.host))
      );
    
    case TYPES.UPDATE_PROXY_STATUS:
      activeId = state.get('activeId');
      if (activeId === action.activeId) {
        return state.setIn(['detail', 'status'], action.status);
      }
      return state;
    
    case TYPES.SET_PROXY_DETAIL:
      return merge_detail(state, action.proxyId, action.detail);

    default:
      return state;
  }
}
