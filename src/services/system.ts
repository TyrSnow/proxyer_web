import axios from 'axios';

let configs: any[];
let configNameMap: any;

function generateMap(list: any[]) {
  const map = {};
  list.map(config => map[config.name] = config);
  return map;
}

export function loadConfigs() {
  return axios.get('/api/config').then(res => {
    configs = res.data.data;
    configNameMap = generateMap(configs);
    return Promise.resolve(res.data.data);
  });
}

export function getConfigs(reload?: boolean) {
  if (reload && configs) {
    return Promise.resolve(configs);
  }
  
  return loadConfigs();
}

export function getConfig(name: string) {
  if (configs) {
    if (!configNameMap[name]) {
      console.debug('Try to read unexist config: ', name);
    }
    return configNameMap[name];
  }
  throw new Error('System Config not load');
}
