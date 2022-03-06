import { AttributeValue } from "./__generated__/AttributeValue";
import { ProductAttribute } from "./__generated__/ProductAttribute";
import { gql } from "@apollo/client";
import { ProductPricing } from "./__generated__/ProductPricing";

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

export type { AttributeValue, ProductAttribute, ProductPricing };
