import { HTMLAttributes } from "react";

export * from "./opportunity";
export type { Opportunity } from "./opportunity";

export const times = <T>(n: number, fn: (i: number) => T) => {
  return Array.from(Array(n)).map((_, i) => fn(i));
};

export const mergeProps = (
  ...propSets: Array<HTMLAttributes<HTMLElement> | undefined>
) => {
  return propSets.reduce((prev, next) => {
    if (!next || !prev) return prev;
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
