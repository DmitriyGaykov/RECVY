export const memo = (fn) => {
  const cache : any = {};

  return (...args) => {
    const stringifiedArgs = JSON.stringify(args);

    if (!cache[stringifiedArgs]) {
      cache[stringifiedArgs] = fn(...args);
    }

    return cache[stringifiedArgs];
  }
}