export const productTypeConfig = {
  NEW_CLIENT: "bg-primary text-white hover:bg-primary/80",
  ADDITIONAL: "bg-green-500 text-white hover:bg-green-600",
  EXTENSION: "bg-purple-500 text-white hover:bg-purple-600",
  RENEWAL: "bg-orange-500 text-white hover:bg-orange-600",
  RELOAN: "bg-blue-500 text-white hover:bg-blue-600",
} as const;

const DEFAULT_CLASS = "bg-gray-100 text-gray-800 hover:bg-gray-200";

export function getProductTypeClass(productType?: string) {
  if (!productType) return DEFAULT_CLASS;
  const type = productType.toUpperCase() as keyof typeof productTypeConfig;
  return productTypeConfig[type] ?? DEFAULT_CLASS;
}
