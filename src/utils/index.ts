export * from "./opportunity";
export type { Opportunity } from "./opportunity";

export const times = <T>(n: number, fn: (i: number) => T) => {
  return Array.from(Array(n)).map((_, i) => fn(i));
};

export const mergeProps = (...propSets: Record<string, any>[]) => {
  return propSets.reduce((prev, next) => {
    return {
      ...prev,
      className: [prev.className, next.className].filter(Boolean).join(" "),
      style: {
        ...prev.style,
        ...next.style,
      },
    };
  }, {});
};
