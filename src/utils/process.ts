export const processer = {
  distance: (v: number) => `${Math.round(v * 10) / 10}km`,
  price: (v: number) => `${v.toLocaleString()}원`,
};
