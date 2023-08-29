export const times = <T>(n: number, fn: (i: number) => T) => {
  return Array.from(Array(n)).map((_, i) => fn(i));
};
