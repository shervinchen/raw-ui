const isObject = (target: unknown) =>
  target !== null && typeof target === 'object';

export default isObject;
