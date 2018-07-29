function convertArrayList(arr: any[]): string[] {
  return arr.map(item => item.toString());
}

function convertObject(obj: object): object {
  const res = {};
  for (const key in obj) {
    if (typeof obj[key] !== 'function') {
      const attrType = typeof obj[key];
      if (attrType === 'object') {
        if (obj[key] instanceof Array) {
          res[key] = convertArrayList(obj[key]);
        } else {
          res[key] = convertObject(obj[key]);
        }
      } else if (attrType === 'number') {
        res[key] = obj[key].toString();
      } else {
        res[key] = obj[key];
      }
    }
  }
  return res;
}

export function convertToFormFields(fields: object): object {
  return convertObject(fields);
}
