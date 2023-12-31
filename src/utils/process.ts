import dayjs from 'dayjs';

export const processer = {
  distance: (v: number) => `${Math.round(v * 10) / 10}km`,
  price: (v: number) => `${v.toLocaleString()}원`,
  date: (dateTime: Date) => {
    const year = String(dateTime.getFullYear()).padStart(4, '0');
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  },
  dateToHHmm: (d: string) => dayjs(d).format('HH:mm'),
  suppressIfOneHundred: (count: number) => (count > 99 ? '99+' : String(count)),
  remain: (v: number, max: number) => {
    if (v > max) return `${max}+`;
    return v;
  },
};
