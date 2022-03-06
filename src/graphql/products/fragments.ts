import { AttributeValue } from "./__generated__/AttributeValue";
import { ProductAttribute } from "./__generated__/ProductAttribute";
import { gql } from "@apollo/client";
import { ProductPricing } from "./__generated__/ProductPricing";
import { ProductMedia } from "./__generated__/ProductMedia";
import { ProductBase } from "./__generated__/ProductBase";

const attributeValueFragment = gql`
  fragment AttributeValue on AttributeValue {
    id
    name
    value
    richText
    boolean
    dateTime
    reference
  }
`;

export const productAttributeFragment = gql`
  fragment ProductAttribute on SelectedAttribute {
    attribute {
      slug
      name
    }
    values {
      ...AttributeValue
    }
  }
  ${attributeValueFragment}
`;

export const productPricingFragment = gql`
  fragment ProductPricing on ProductPricingInfo {
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
`;

export const productMediaFragment = gql`
  fragment ProductMedia on ProductMedia {
    url
    alt
  }
`;

export const productVariantFragment = gql`
  fragment ProductVariant on ProductVariant {
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
      ...ProductMedia
    }
  }
  ${productAttributeFragment}
  ${productAttributeFragment}
`;

export const productBaseFragment = gql`
  fragment ProductBase on Product {
    id
    slug
    name
    media {
      ...ProductMedia
    }
  }
  ${productMediaFragment}
`;

export type {
  AttributeValue,
  ProductAttribute,
  ProductPricing,
  ProductMedia,
  ProductBase,
};
