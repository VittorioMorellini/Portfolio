import { Blog } from ".contentlayer/generated/types";

export const select = (obj: any, keys: string[]) => {
    return keys.reduce((acc: any, key: string) => {
      acc[key] = obj[key];
      return acc;
    }, {});
  };