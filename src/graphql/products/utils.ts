import { formatCurrency } from "#/utils/number";

interface ProductAttributeValue {
  name: string | null;
  value: string | null;
  richText?: any | null;
}

export interface ProductAttributeMap {
  [slug: string]: ProductAttributeValue[];
}

interface ProductAttributeMapInput {
  attributes: {
    attribute: {
      slug: string | null;
    };
    values: (ProductAttributeValue | null)[];
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
        (value): value is ProductAttributeValue => !!value
      );
    }
  });
  return attributeMap;
}

interface ProductPriceInput {
  pricing: {
    priceRange: {
      start: {
        gross: {
          amount: number;
        };
      } | null;
      stop: {
        gross: {
          amount: number;
        };
      } | null;
    } | null;
  } | null;
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
