import { hardcodedPrices } from "../Components/constants";

export function getPriceLabel(value) {
  const item = hardcodedPrices.find((p) => p.value === Number(value));
  return item ? item.label : value?.toLocaleString?.() || value;
}

export function formatPriceLabel(millionValue) {
  if (millionValue < 1000) {
    return `${millionValue.toLocaleString("fa-IR")} میلیون تومان`;
  }
  // For 1000, 1500, 2000, 2500, etc.
  const billion = Math.floor(millionValue / 1000).toLocaleString("fa-IR");
  const remainder = millionValue % 1000;

  if (remainder === 0) {
    return `${billion} میلیارد تومان`;
  }
  if (remainder === 500) {
    return `${billion} و نیم میلیارد تومان`;
  }
  // For other cases, show decimal
  const decimal = (millionValue / 1000).toLocaleString("fa-IR", { maximumFractionDigits: 2 });
  return `${decimal} میلیارد تومان`;
}
