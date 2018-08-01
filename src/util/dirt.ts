export function dirt(target: any, ori: any): any {
  for (const key in target) {
    if (typeof target[key] !== 'function') {
      if (ori[key] === target[key]) {
        delete target[key];
      }
    }
  }
}