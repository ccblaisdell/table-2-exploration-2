export * from "./opportunity";
export type { Opportunity } from "./opportunity";

export const times = <T>(n: number, fn: (i: number) => T) => {
  return Array.from(Array(n)).map((_, i) => fn(i));
};

export const mergeProps = (...propSets: Record<string, any>[]) => {
  return propSets.reduce((prev, next) => {
    const properties = new Set([...Object.keys(prev), ...Object.keys(next)]);
    return Array.from(properties).reduce((result, key) => {
      const prevValue = prev[key];
      const nextValue = next[key];

      if (
        typeof prevValue === "function" &&
        typeof nextValue === "function" &&
        key.startsWith("on")
      ) {
        return {
          ...result,
          [key]: mergeCallbacks(prevValue, nextValue),
        };
      }

      if (
        typeof prevValue === "function" &&
        typeof nextValue === "function" &&
        key.startsWith("get")
      ) {
        return {
          ...result,
          [key]: mergePropGetters(prevValue, nextValue),
        };
      }

      if (key === "styles") {
        return {
          ...result,
          [key]: mergeStyles(prevValue, nextValue),
        };
      }

      if (key === "classNames") {
        return {
          ...result,
          [key]: mergeClassNames(prevValue, nextValue),
        };
      }

      return {
        ...result,
        [key]: nextValue ?? prevValue,
      };
    }, {});
  }, {});
};

const mergeClassNames = (...classNames: string[]) =>
  classNames.filter(Boolean).join(" ");

const mergeStyles = (...styles: React.CSSProperties[]) => {
  return styles.reduce((prev, next) => {
    return {
      ...prev,
      ...next,
    };
  }, {});
};

const mergeCallbacks = (...fns: Function[]) => {
  return (...args: any[]) => {
    fns.forEach((fn) => fn(...args));
  };
};

const mergePropGetters = (...fns: Function[]) => {
  return (...args: any[]) => {
    return fns.reduce((prev, next) => {
      return mergeProps(prev, next(...args));
    }, {});
  };
};
