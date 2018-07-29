export function isInt(value: any) {
  if (isNum(value)) {
    // tslint:disable-next-line:triple-equals
    if (value == parseInt(value, 10)) {
      return true;
    }
  }
  return false;
}

export function isNum(value: any) {
  if (typeof value === 'number') {
    return true;
  }
  if (typeof value === 'string') {
    if (value.match(/^\d*(.\d*)?/)) {
      return true;
    }
  }
  return false;
}

export function isIp(value: string) {
  const arrV = value.split('.');
  if (arrV.length === 4) {
    let num;
    for (let i = 0; i < 4; i++) {
      if (isInt(arrV[i])) {
        num = parseInt(arrV[i], 10);
        if ((num > 255) || (num < 0)) {
          return false;
        }
      }
    }
    return true;
  }
  return false;
}

export function isUrl(value: string) {
  return true;
}

export function isHost(value: string) {
  return isUrl(value) || isIp(value);
}
