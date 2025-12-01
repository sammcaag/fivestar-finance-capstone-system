export const preventInvalidInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === "+") e.preventDefault();
};

export const preventNegativeAndLimitDecimals = (
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (value: number | "") => void
) => {
  let value = e.target.value;

  // Allow empty input to enable clearing
  if (value === "") {
    onChange("");
    return;
  }

  // Remove leading zeros except for "0"
  value = value.replace(/^0+(?=\d)/, "");

  // Ensure valid number and prevent negatives
  let numValue = Math.max(0, parseFloat(value));

  // Limit to 2 decimal places
  numValue = Math.floor(numValue * 100) / 100; // Truncate extra decimals

  onChange(numValue);
};
