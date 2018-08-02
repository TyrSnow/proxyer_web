export function transferObjectToSortedArray(obj: object) {
  const keys: string[] = Object.keys(obj).sort();

  return keys.filter((key: string) => {
    return typeof obj[key] !== 'function';
  }).map((key: string) => {
    return {
      key,
      value: obj[key],
    };
  });
}
