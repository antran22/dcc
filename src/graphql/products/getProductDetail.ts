import { gql } from "@apollo/client";
import _ from "lodash";
import client from "../apolloClient";
import {
  ProductDetail,
  ProductDetail_product,
  ProductDetail_product_media,
  ProductDetail_product_variants,
} from "./__generated__/ProductDetail";
import {
  AttributeValue,
  productAttributeFragment,
  productPricingFragment,
} from "./fragments";

export type Product = ProductDetail_product;
export type ProductMedia = ProductDetail_product_media;

export async function getProductDetail(
  productSlug: string
): Promise<Product | null> {
  const { data } = await client.query<ProductDetail>({
    query: gql`
      query ProductDetail($slug: String) {
        product(slug: $slug) {
          id
          slug
          name

          description

          media {
            url
            alt
          }

          attributes {
            ...ProductAttribute
          }

          pricing {
            ...ProductPricing
          }

          variants {
            id
            name
            attributes {
              ...ProductAttribute
            }

            pricing {
              price {
                gross {
                  amount
                }
              }
            }

            media {
              url
              alt
            }
          }
        }
      }

      ${productAttributeFragment}
      ${productPricingFragment}
    `,
    variables: {
      slug: productSlug,
    },
  });
  return data.product;
}

export type ProductVariant = ProductDetail_product_variants;

export function getProductColors(product: Product) {
  return getProductAttributeValue(product, "color");
}

export function getProductSizes(product: Product) {
  return getProductAttributeValue(product, "size");
}

export function getProductAttributeValue(
  product: Product,
  attributeSlug: string
): AttributeValue[] {
  const values = product.variants
    ?.map((variant) => {
      if (variant) {
        return getProductVariantAttributeValue(variant, attributeSlug);
      }
    })
    .filter((value): value is AttributeValue => !!value);
  return _.uniqBy<AttributeValue>(values, (value) => value.id);
}

export function getProductVariantAttributeValue(
  variant: ProductVariant,
  attributeSlug: string
): AttributeValue | undefined {
  if (variant.attributes) {
    for (const attr of variant.attributes) {
      if (attr.attribute.slug === attributeSlug) {
        return attr.values[0] ?? undefined;
      }
    }
  }
}

export function getVariantByColorAndSize(
  product: Product,
  color?: AttributeValue,
  size?: AttributeValue
): ProductVariant | undefined {
  if (!product.variants) {
    return undefined;
  }
  for (const variant of product.variants) {
    if (!variant) {
      continue;
    }
    const variantColor = getProductVariantAttributeValue(variant, "color");
    const variantSize = getProductVariantAttributeValue(variant, "size");

    if (variantColor?.id === color?.id && variantSize?.id === size?.id) {
      return variant;
    }
  }
}

export function getProductVariantPrice(productVariant: ProductVariant): number {
  return productVariant.pricing?.price?.gross?.amount ?? 0;
}

export function getProductCrossSellIds(product: Product): string[] {
  const attributeValues = getProductAttributeValue(product, "cross-sell");
  return attributeValues
    .map((value) => value.reference)
    .filter((id): id is string => !!id);
}
