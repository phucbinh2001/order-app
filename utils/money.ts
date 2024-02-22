/**
 * Format number to VND.
 * Example: formatVND(10000);           // '10.000'
 */
export function formatMoney(num: number = 0) {
  const config = {
    currency: "VND",
    unit: undefined,
    maximumFractionDigits: 9,
  };
  const formated = new Intl.NumberFormat("vi-VN", config).format(num);
  return formated;
}
