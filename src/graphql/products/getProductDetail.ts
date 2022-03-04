import { gql } from "@apollo/client";
import _ from "lodash";
import client from "../apolloClient";
import {
  ProductDetail,
  ProductDetail_product,
  ProductDetail_product_media,
  ProductDetail_product_variants,
  ProductDetail_product_variants_attributes_values,
} from "./__generated__/ProductDetail";

export type SingleProductDetail = ProductDetail_product;
export type ProductMedia = ProductDetail_product_media;

export async function getProductDetail(
  productSlug: string
): Promise<SingleProductDetail | null> {
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
            attribute {
              name
              slug
            }
            values {
              name
              value
              richText
            }
          }

          pricing {
            priceRange {
              start {
                gross {
                  amount
                }
              }
              stop {
                gross {
                  amount
                }
              }
            }
          }

          variants {
            attributes {
              attribute {
                name
                slug
              }
              values {
                id
                name
                value
                richText
              }
            }
            id
            name
            sku
            quantityAvailable(address: { country: VN })
            media {
              url
              alt
            }
          }
        }
      }
    `,
    variables: {
      slug: productSlug,
    },
  });
  return data.product;
}

export type AttributeValue = ProductDetail_product_variants_attributes_values;

export type ProductVariant = ProductDetail_product_variants;

export function getAllAttributeValuesBySlug(
  product: SingleProductDetail,
  slug: string
): AttributeValue[] {
  const values = product.variants
    ?.map((variant) => {
      if (variant?.attributes) {
        for (const attr of variant?.attributes) {
          if (attr.attribute.slug === slug) {
            return attr.values[0];
          }
        }
      }
    })
    .filter((value): value is AttributeValue => !!value);
  return _.uniqBy<AttributeValue>(values, (value) => value.id);
}

export function getProductColors(product: SingleProductDetail) {
  return getAllAttributeValuesBySlug(product, "color");
}

export function getProductSizes(product: SingleProductDetail) {
  return getAllAttributeValuesBySlug(product, "size");
}

export function getVariantByColorAndSize(
  product: SingleProductDetail,
  color: AttributeValue,
  size: AttributeValue
): ProductVariant | undefined {
  if (!product.variants) {
    return undefined;
  }
  for (const variant of product.variants) {
    if (variant?.attributes) {
      let matchColor = false;
      let matchSize = false;
      for (const attr of variant?.attributes) {
        if (attr.attribute.slug === "color") {
          matchColor = attr.values[0] === color;
        }
        if (attr.attribute.slug === "size") {
          matchSize = attr.values[0] === size;
        }
      }
      if (matchColor && matchSize) {
        return variant;
      }
    }
  }
}
