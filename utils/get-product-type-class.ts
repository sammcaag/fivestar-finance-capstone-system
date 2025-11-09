// utils/get-product-type-class.ts
export const productTypeConfig = {
  "new client": { className: "bg-primary text-white hover:bg-primary/80" },
  additional: { className: "bg-green-500 text-white hover:bg-green-600" },
  extension: { className: "bg-purple-500 text-white hover:bg-purple-600" },
  renewal: { className: "bg-orange-500 text-white hover:bg-orange-600" },
  reloan: { className: "bg-blue-500 text-white hover:bg-blue-600" },
} as const;

export function getProductTypeClass(productType: string | undefined) {
  if (!productType) {
    return { className: "bg-gray-100 text-gray-800 hover:bg-gray-200" };
  }
  const type = productType.toLowerCase() as keyof typeof productTypeConfig;
  return (
    productTypeConfig[type] || {
      className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    }
  );
}
