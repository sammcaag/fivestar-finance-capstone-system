export function getProductTypeClass(productType: string | undefined): string {
  if (!productType) {
    return "";
  }

  const type = productType.toLowerCase();

  const productTypeClassMap: Record<string, string> = {
    "new client": "bg-primary",
    additional: "bg-green-500",
    extension: "bg-purple-500",
    renewal: "bg-orange-500",
    reloan: "bg-blue-500",
  };

  return productTypeClassMap[type] || "";
}
