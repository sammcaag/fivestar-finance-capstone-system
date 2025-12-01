export function formatCurrency(value: number | string, decimalPlaces: number = 2): string {
  const num = Number(value);
  if (isNaN(num)) return "0.00"; // Handle invalid numbers

  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
}

export function removeCommas(value: number | string): string {
  return String(value).replace(/,/g, "");
}
