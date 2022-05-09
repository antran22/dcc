import { getProductAttributeMap } from "@/graphql/products/utils";
import { gql } from "@apollo/client";
import _ from "lodash";
import client from "../apolloClient";
import {
  ProductDetail,
  ProductDetail_product,
  ProductDetail_product_variants,
} from "./__generated__/ProductDetail";
import {
  AttributeValue,
  productAttributeFragment,
  productBaseFragment,
  productPricingFragment,
  productVariantFragment,
} from "./fragments";

export type Product = ProductDetail_product;

export async function getProductDetail(
  productSlug: string
): Promise<Product | null> {
  const { data } = await client.query<ProductDetail>({
    query: gql`
      query ProductDetail($slug: String) {
        product(slug: $slug) {
          ...ProductBase

          description

          attributes {
            ...ProductAttribute
          }

          pricing {
            ...ProductPricing
          }

          variants {
            ...ProductVariant
          }
        }
      }

      ${productBaseFragment}
      ${productAttributeFragment}
      ${productVariantFragment}
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
  return getAllUniqueVariantAttributeValues(product, "color");
}

export function getProductSizes(product: Product) {
  return getAllUniqueVariantAttributeValues(product, "size");
}

export function getAllUniqueVariantAttributeValues(
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
  const attributeMap = getProductAttributeMap(product);
  const crossSell = attributeMap["cross-sell"];
  if (!crossSell) {
    return [];
  }

  return crossSell
    .map((value) => value.reference)
    .filter((id): id is string => !!id);
}