import axios from 'axios';

const interfaceCache: any[] = [];
export function loadInterfaceList(proxyId: string, forceReload: boolean = false) {
  if (!forceReload) {
    if (interfaceCache[proxyId]) {
      return Promise.resolve(interfaceCache[proxyId]);
    }
  }
  return axios.get('/api/interface', {
    params: {
      proxyId,
    },
  }).then(res => {
    interfaceCache[proxyId] = res;
    return Promise.resolve(res);
  });
}

export function updateInterface(interfaceId: string, data: any) {
  return axios.put(`/api/interface/${interfaceId}`, {
    data,
  });
}

export function analysisProxyInterface(proxyId: string) {
  return axios.put('/api/task/analyse_proxy_interface', {
    params: proxyId,
  });
}
