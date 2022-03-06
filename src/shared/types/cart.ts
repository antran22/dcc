import {
  CrossSellProduct,
  Product,
  ProductMedia,
  ProductVariant,
} from "@/graphql/products";

export interface CartItem {
  quantity: number;
  selection: ProductSelection;
}

export type ProductSelection =
  | ProductSelectionCrossSell
  | ProductSelectionBrowse;

export interface ProductSelectionCrossSell {
  product: CrossSellProduct;
  type: "cross_sell";
  variant: ProductVariant;
}

export interface ProductSelectionBrowse {
  product: Product;
  type: "browse";
  variant: ProductVariant;
}

export function getProductSelectionThumbnail({
  variant,
  product,
}: ProductSelection): ProductMedia | undefined {
  if (variant.media?.length) {
    return variant.media[0];
  }
  if (product.media?.length) {
    return product.media[0];
  }
}
