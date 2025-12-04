export const formatBytes = (bytes?: number) => {
  if (!bytes || Number.isNaN(bytes)) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB", "TB"] as const;
  let value = Math.max(bytes, 0);
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const formattedValue = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);

  return `${formattedValue} ${units[unitIndex]}`;
};
