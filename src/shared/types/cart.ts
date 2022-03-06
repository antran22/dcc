import {
  ProductMedia,
  ProductVariant,
  Product,
} from "@/graphql/products";

export interface CartItem {
  quantity: number;
  selection: ProductSelection;
}

export interface ProductSelection {
  product: Product;
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
