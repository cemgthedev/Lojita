export type VariantDetail = {
  attributeValueId: string;
  attributeId: string;
};

export type VariantFormValues = {
  price: string;
  stock: string;
  status: string;
  sku: string;
  images: string[];
  details: VariantDetail[];
};

export const emptyVariantFormValues = (): VariantFormValues => ({
  price: "",
  stock: "",
  status: "active",
  sku: "",
  images: [],
  details: [],
});
