/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductVariant
// ====================================================

export interface ProductVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
}

export interface ProductVariant_attributes_values {
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
  /**
   * Represents the boolean value of the attribute value.
   */
  boolean: boolean | null;
  /**
   * Represents the date time value of the attribute value.
   */
  dateTime: any | null;
  /**
   * The ID of the attribute reference.
   */
  reference: string | null;
}

export interface ProductVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductVariant_attributes_values | null)[];
}

export interface ProductVariant_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ProductVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductVariant_pricing_price_gross;
}

export interface ProductVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * The price, with any discount subtracted.
   */
  price: ProductVariant_pricing_price | null;
}

export interface ProductVariant_media {
  __typename: "ProductMedia";
  /**
   * The URL of the media.
   */
  url: string;
  alt: string;
}

export interface ProductVariant {
  __typename: "ProductVariant";
  id: string;
  name: string;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: ProductVariant_attributes[];
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductVariant_pricing | null;
  /**
   * List of media for the product variant.
   */
  media: ProductVariant_media[] | null;
}
