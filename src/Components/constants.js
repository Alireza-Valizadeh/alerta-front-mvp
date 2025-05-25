import { formatPriceLabel } from "../utils/formatters";

const toPersianDigits = (str) => str.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

export const hardcodedPrices = [
  ...Array.from({ length: 20 }, (_, i) => {
    const value = 50000000 + i * 50000000; // 50M to 1B
    const million = value / 1000000;
    return {
      value,
      label: formatPriceLabel(million),
    };
  }),
  ...[1250, 1500, 1750, 2000, 2500, 3000, 4000].map((million) => ({
    value: million * 1000000,
    label: formatPriceLabel(million),
  })),
];

export const hardcodedYears = [
  ...Array.from({ length: 1404 - 1366 + 1 }, (_, i) => {
    const year = 1366 + i;
    return { value: year, label: toPersianDigits(year) };
  }),
  ...Array.from({ length: 2026 - 1980 + 1 }, (_, i) => {
    const year = 1980 + i;
    return { value: year, label: toPersianDigits(year) };
  }),
];

export const hardcodedDurations = Array.from({ length: 12 }, (_, i) => {
  const month = i + 1;
  return { value: month, label: `${toPersianDigits(month)} ماه` };
});

export const hardcodedMileage = [50000, 100000, 150000, 200000, 250000, 300000].map((km) => ({
  value: km,
  label: `${toPersianDigits(km.toLocaleString())} کیلومتر`,
}));
