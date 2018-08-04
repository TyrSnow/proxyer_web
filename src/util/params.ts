export function get_param(paramKey: string): string {
  const params = get_params();

  return params[paramKey];
}

export function get_params(): object {
  if (location.search.length === 0) {
    return {};
  }
  const arrParams = location.search.substr(1).split('&');
  const result = {};
  arrParams.map(p => {
    const sp = p.split('=');
    result[sp[0]] = sp[1];
  })
  
  return result;
}