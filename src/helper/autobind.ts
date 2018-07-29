export function bind(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  target[propertyKey] = target[propertyKey].bind(target);
}

const IGNORE_MAP = {};
const COMPONENT_API = ['setState', 'forceUpdate', 'render'];
const COMPONENT_LIFECIRCLE = [
  'componentDidMount',
  'shouldComponentUpdate',
  'componentWillUnmount',
  'componentDidCatch',
  'getSnapshotBeforeUpdate',
  'componentDidUpdate',
  'componentWillMount',
  'UNSAFE_componentWillMount',
  'componentWillReceiveProps',
  'UNSAFE_componentWillReceiveProps',
  'componentWillUpdate',
  'UNSAFE_componentWillUpdate',
];
COMPONENT_API.map(text => IGNORE_MAP[text] = true);
COMPONENT_LIFECIRCLE.map(text => IGNORE_MAP[text] = true);

function bindThis(context: object) {
  for (const key in context) {
    if (!IGNORE_MAP[key]) {
      if (typeof context[key] === 'function') {
        context[key] = context[key].bind(context);
      }
    }
  }
}

export function autobind<T extends {new(...args:any[]):{}}>(constructor:T) {
  return class WrapClass extends constructor {
    constructor(...args: any[]) {
      const [ props, context = {} ] = args;
      super(props, context);
      bindThis(this);
    }
  }
}