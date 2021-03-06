export enum METHOD_TYPE {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
  COPY,
  HEAD,
  OPTIONS,
  LINK,
  UNLINK,
  PURGE,
  LOCK,
  UNLOCK,
  PROPFIND,
  VIEW,
  ALL = -1,
};

export const METHOD_COLOR = {
  [METHOD_TYPE.ALL]: 'magenta',
  [METHOD_TYPE.GET]: 'magenta',
  [METHOD_TYPE.POST]: 'red',
  [METHOD_TYPE.PUT]: 'volcano',
  [METHOD_TYPE.PATCH]: 'orange',
  [METHOD_TYPE.DELETE]: 'gold',
  [METHOD_TYPE.COPY]: 'lime',
  [METHOD_TYPE.HEAD]: 'green',
  [METHOD_TYPE.OPTIONS]: 'cyan',
  [METHOD_TYPE.LINK]: 'blue',
  [METHOD_TYPE.UNLINK]: 'geekblue',
  [METHOD_TYPE.PURGE]: 'purple',
  [METHOD_TYPE.LOCK]: 'red',
  [METHOD_TYPE.UNLOCK]: 'red',
  [METHOD_TYPE.PROPFIND]: 'red',
  [METHOD_TYPE.VIEW]: 'magenta',
};

export const METHOD_LABEL_SELECT = {
  [METHOD_TYPE.GET]: 'GET',
  [METHOD_TYPE.POST]: 'POST',
  [METHOD_TYPE.PUT]: 'PUT',
  [METHOD_TYPE.PATCH]: 'PATCH',
  [METHOD_TYPE.DELETE]: 'DELETE',
  [METHOD_TYPE.COPY]: 'COPY',
  [METHOD_TYPE.HEAD]: 'HEAD',
  [METHOD_TYPE.OPTIONS]: 'OPTIONS',
  [METHOD_TYPE.LINK]: 'LINK',
  [METHOD_TYPE.UNLINK]: 'UNLINK',
  [METHOD_TYPE.PURGE]: 'PURGE',
  [METHOD_TYPE.LOCK]: 'LOCK',
  [METHOD_TYPE.UNLOCK]: 'UNLOCK',
  [METHOD_TYPE.PROPFIND]: 'PROPFIND',
  [METHOD_TYPE.VIEW]: 'VIEW',
};

export const METHOD_LABEL = Object.assign({
  [METHOD_TYPE.ALL]: 'ALL',
}, METHOD_LABEL_SELECT);
