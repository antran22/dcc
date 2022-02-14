import { Combo } from "#/types/combo";
import { StrapiImage } from "#/types/image";
import _ from "lodash";
import { Product, ProductColor, ProductSize } from "./product";

export interface ProductVariantSelection {
  type: "product_variant";
  product: Product;
  color?: ProductColor;
  size?: ProductSize;
}

export interface ComboSelection {
  type: "combo";
  combo: Combo;
}

export type CartSelection = ProductVariantSelection | ComboSelection;
export interface CartItem {
  quantity: number;
  selection: CartSelection;
}

export function isEqualSelection(
  selection1: CartSelection,
  selection2: CartSelection
): boolean {
  if (selection1.type === "combo" && selection2.type === "combo") {
    return selection1.combo.id === selection2.combo.id;
  }
  if (
    selection1.type === "product_variant" &&
    selection2.type === "product_variant"
  ) {
    return (
      selection1.product.id === selection2.product.id &&
      selection1.size?.id === selection2.size?.id &&
      selection1.color?.id === selection2.color?.id
    );
  }
  return false;
}

export function getSelectionTitle(selection: CartSelection): string {
  if (selection.type === "combo") {
    return selection.combo.name;
  }
  return selection.product.title;
}

export function getSelectionThumbnail(
  selection: CartSelection
): StrapiImage | undefined {
  if (selection.type === "combo") {
    return selection.combo.images[0];
  }
  return selection.color?.images[0] ?? selection.product.thumbnails[0];
}

export function getSelectionPrice(selection: CartSelection): number {
  if (selection.type === "combo") {
    return selection.combo.price;
  }
  return selection.product.price;
}

export function getSelectionCrossSell(selection: CartSelection): Product[] {
  if (selection.type === "combo") {
    return _.uniqBy(
      selection.combo.products.flatMap((product) => product.cross_sell),
      "id"
    );
  }

  return selection.product.cross_sell;
}

export function getSelectionProductIds(selection: CartSelection): string[] {
  if (selection.type === "combo") {
    return selection.combo.products.map((product) => product.id);
  }
  return [selection.product.id];
}
