import { ProductSelection } from "#/types";
import { formatCurrency } from "#/utils/misc";
import { ProductPricing } from "@/graphql/products/__generated__/ProductPricing";
import { AttributeValue } from "./__generated__/AttributeValue";

export interface ProductAttributeMap {
  [slug: string]: AttributeValue[];
}

interface ProductAttributeMapInput {
  attributes: {
    attribute: {
      slug: string | null;
    };
    values: (AttributeValue | null)[];
  }[];
}

export function getProductAttributeMap(
  product: ProductAttributeMapInput
): ProductAttributeMap {
  const attributeMap: ProductAttributeMap = {};
  product.attributes.forEach((attribute) => {
    const slug = attribute.attribute.slug;
    if (slug) {
      attributeMap[slug] = attribute.values.filter(
        (value): value is AttributeValue => !!value
      );
    }
  });
  return attributeMap;
}

interface ProductPriceInput {
  pricing: ProductPricing | null;
}

export function getPriceStringFromProduct(product: ProductPriceInput): string {
  const priceStart = product.pricing?.priceRange?.start?.gross?.amount;
  const priceStop = product.pricing?.priceRange?.stop?.gross?.amount;

  if (!priceStart || !priceStop) {
    return "";
  }

  if (priceStart === priceStop) {
    return formatCurrency(priceStart);
  }

  return `${formatCurrency(priceStart)} - ${formatCurrency(priceStop)}`;
}

export function productSelectionName(selection: ProductSelection): string {
  const variant = selection.variant;
  const productName = selection.product.name;
  if (variant.name !== variant.id) {
    return `${productName} - ${variant.name}`;
  }
  return productName;
}
