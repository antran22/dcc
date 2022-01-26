import { StrapiImage } from "#/types/image";
import { Product, ProductColor, ProductSize } from "./product";

export interface CartItem {
  quantity: number;
  productVariant: ProductVariant;
}

export interface ProductVariant {
  product: Product;
  size?: ProductSize;
  color?: ProductColor;
}

export function sameProductVariant(
  variant1: ProductVariant,
  variant2: ProductVariant
): boolean {
  return (
    variant1.product.id === variant2.product.id &&
    variant1.size?.id === variant2.size?.id &&
    variant1.color?.id === variant2.color?.id
  );
}

export function getProductVariantThumbnail(
  productVariant: ProductVariant
): StrapiImage | undefined {
  return productVariant?.color?.images[0] ?? productVariant.product.thumbnails[0];
}
