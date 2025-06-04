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

export function toPersianDigits(str) {
  return str.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

export function formatPersianDateTime(dateInput) {
  if (!dateInput) return "-";
  const date = new Date(dateInput);
  if (isNaN(date)) return "-";
  // Get time in Persian digits
  const time = date.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
  // Get Jalali date in Persian digits
  const jalaliDate = date.toLocaleDateString("fa-IR-u-ca-persian", { year: "numeric", month: "2-digit", day: "2-digit" });
  return `${time}  -  ${jalaliDate}`;
}

export function formatRelativeTime(dateInput) {
  if (!dateInput) return "-";
  const now = new Date();
  const date = new Date(dateInput);
  if (isNaN(date)) return "-";
  const diff = Math.floor((now - date) / 1000); // in seconds
  if (diff < 60) return `${toPersianDigits(diff)} ثانیه پیش`;
  if (diff < 3600) return `${toPersianDigits(Math.floor(diff / 60))} دقیقه پیش`;
  if (diff < 86400) return `${toPersianDigits(Math.floor(diff / 3600))} ساعت پیش`;
  if (diff < 2592000) return `${toPersianDigits(Math.floor(diff / 86400))} روز پیش`;
  // For longer, show date
  return formatPersianDateTime(dateInput);
}
