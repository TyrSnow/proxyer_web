import * as Immutable from 'immutable';
import * as TYPES from './actionType';
import { RequestAction } from './action.d';

const initialState = Immutable.fromJS({});

function generateIdMap(list: any[]) {
  return [{}].concat(list).reduce((map, cur: any, curIndex: number) => {
    map[cur._id] = curIndex - 1;
    return map;
  });
}

function mergeCachedList(state: Immutable.Map<string, any>, proxyId: string, lastModify: string, list: any[]) {
  if (list.length === 0) {
    return state;
  }
  const cache = state.get(proxyId);
  if (cache) {
    // 合并新日志里面id一样的数据
    const { idMap } = cache;
    const oriList = cache.list;
    list = ([] as any[]).concat(list.filter(val => {
      if (idMap[val._id] || (idMap[val._id] === 0)) {
        // 有历史记录则更新
        oriList[idMap[val._id]] = val;
        return false;
      }
      return true;
    })).concat(oriList);
  }

  // 创建新缓存
  return state.set(proxyId, {
    lastModify,
    list,
    idMap: generateIdMap(list),
  });
}

export default (state = initialState, action: RequestAction) => {
  switch (action.type) {
    case TYPES.UPDATE_REQUEST_LIST:
      return mergeCachedList(state, action.proxyId, action.lastModify, action.list);

    default:
      return state;
  }
}