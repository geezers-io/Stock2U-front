export function flow(functions) {
  const length = functions.length;

  return (...args) => {
    let index = 0;
    let result = length ? functions[index](...args) : args[0];
    while (++index < length) {
      result = functions[index](result);
    }
    return result;
  };
}
