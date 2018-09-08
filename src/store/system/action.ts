import axios from 'axios';
import * as actions from './actionType';
export function updateConfig(configs: any) {
  return {
    type: actions.UPDATE_CONFIG,
    configs,
  };
}

export function loadConfig() {
  return axios.get('/api/system/config').then(
    resp => console.debug(resp),
  );
}