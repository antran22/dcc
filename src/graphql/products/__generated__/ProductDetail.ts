/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductDetail
// ====================================================

export interface ProductDetail_product_media {
  __typename: "ProductMedia";
  /**
   * The URL of the media.
   */
  url: string;
  alt: string;
}

export interface ProductDetail_product_attributes_attribute {
  __typename: "Attribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
}

export interface ProductDetail_product_attributes_values {
  __typename: "AttributeValue";
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Represent value of the attribute value (e.g. color values for swatch attributes).
   */
  value: string | null;
  /**
   * Represents the text (JSON) of the attribute value.
   */
  richText: any | null;
}

export interface ProductDetail_product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetail_product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetail_product_attributes_values | null)[];
}

export interface ProductDetail_product_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ProductDetail_product_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetail_product_pricing_priceRange_start_gross;
}

export interface ProductDetail_product_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ProductDetail_product_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetail_product_pricing_priceRange_stop_gross;
}

export interface ProductDetail_product_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetail_product_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetail_product_pricing_priceRange_stop | null;
}

export interface ProductDetail_product_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductDetail_product_pricing_priceRange | null;
}

export interface ProductDetail_product_variants_attributes_attribute {
  __typename: "Attribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
}

export interface ProductDetail_product_variants_attributes_values {
  __typename: "AttributeValue";
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Represent value of the attribute value (e.g. color values for swatch attributes).
   */
  value: string | null;
  /**
   * Represents the text (JSON) of the attribute value.
   */
  richText: any | null;
}

export interface ProductDetail_product_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetail_product_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetail_product_variants_attributes_values | null)[];
}

export interface ProductDetail_product_variants_media {
  __typename: "ProductMedia";
  /**
   * The URL of the media.
   */
  url: string;
  alt: string;
}

export interface ProductDetail_product_variants {
  __typename: "ProductVariant";
  /**
   * List of attributes assigned to this variant.
   */
  attributes: ProductDetail_product_variants_attributes[];
  id: string;
  name: string;
  sku: string | null;
  /**
   * Quantity of a product available for sale in one checkout. Field value will be `null` when no `limitQuantityPerCheckout` in global settings has been set, and `productVariant` stocks are not tracked.
   */
  quantityAvailable: number | null;
  /**
   * List of media for the product variant.
   */
  media: ProductDetail_product_variants_media[] | null;
}

export interface ProductDetail_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  description: any | null;
  /**
   * List of media for the product.
   */
  media: ProductDetail_product_media[] | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: ProductDetail_product_attributes[];
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetail_product_pricing | null;
  /**
   * List of variants for the product.
   */
  variants: (ProductDetail_product_variants | null)[] | null;
}

export interface ProductDetail {
  /**
   * Look up a product by ID.
   */
  product: ProductDetail_product | null;
}

export interface ProductDetailVariables {
  slug?: string | null;
}
