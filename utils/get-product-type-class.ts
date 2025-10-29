export function getProductTypeClass(productType: string) {
  if (!productType) {
    return "";
  }
  productType = productType.toLowerCase();

  // Primary Color
  if (productType === "new client") {
    return "bg-primary";
  }

  // Green Group
  if (productType === "additional") {
    return "bg-green-500";
  }

  // Purple Group
  if (productType === "extension") {
    return "bg-purple-500";
  }

  // Orange Group
  if (productType === "renewal") {
    return "bg-orange-500";
  }

  // Blue Group
  if (productType === "reloan") {
    return "bg-blue-500";
  }

  return "";
}
