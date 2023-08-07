export function sum(a: number, b: number) {
    return a+b
}

export const select = (obj: any, keys: string[]) => {
    return keys.reduce((acc: any, key: string) => {
      acc[key] = obj[key];
      return acc;
    }, {});
};

const ImageLoader = (src: any) => {
    return src;
}

export default ImageLoader