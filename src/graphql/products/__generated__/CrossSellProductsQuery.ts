/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CrossSellProductsQuery
// ====================================================

export interface CrossSellProductsQuery_products_edges_node_media {
  __typename: "ProductMedia";
  /**
   * The URL of the media.
   */
  url: string;
  alt: string;
}

export interface CrossSellProductsQuery_products_edges_node_variants_attributes_attribute {
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

export interface CrossSellProductsQuery_products_edges_node_variants_attributes_values {
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

export interface CrossSellProductsQuery_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: CrossSellProductsQuery_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (CrossSellProductsQuery_products_edges_node_variants_attributes_values | null)[];
}

export interface CrossSellProductsQuery_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface CrossSellProductsQuery_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CrossSellProductsQuery_products_edges_node_variants_pricing_price_gross;
}

export interface CrossSellProductsQuery_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * The price, with any discount subtracted.
   */
  price: CrossSellProductsQuery_products_edges_node_variants_pricing_price | null;
}

export interface CrossSellProductsQuery_products_edges_node_variants_media {
  __typename: "ProductMedia";
  /**
   * The URL of the media.
   */
  url: string;
  alt: string;
}

export interface CrossSellProductsQuery_products_edges_node_variants {
  __typename: "ProductVariant";
  id: string;
  name: string;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: CrossSellProductsQuery_products_edges_node_variants_attributes[];
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: CrossSellProductsQuery_products_edges_node_variants_pricing | null;
  /**
   * List of media for the product variant.
   */
  media: CrossSellProductsQuery_products_edges_node_variants_media[] | null;
  /**
   * Quantity of a product available for sale in one checkout. Field value will be `null` when no `limitQuantityPerCheckout` in global settings has been set, and `productVariant` stocks are not tracked.
   */
  quantityAvailable: number | null;
}

export interface CrossSellProductsQuery_products_edges_node_attributes_attribute {
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

export interface CrossSellProductsQuery_products_edges_node_attributes_values {
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

export interface CrossSellProductsQuery_products_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: CrossSellProductsQuery_products_edges_node_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (CrossSellProductsQuery_products_edges_node_attributes_values | null)[];
}

export interface CrossSellProductsQuery_products_edges_node {
  __typename: "Product";
  id: string;
  name: string;
  slug: string;
  /**
   * List of media for the product.
   */
  media: CrossSellProductsQuery_products_edges_node_media[] | null;
  /**
   * List of variants for the product.
   */
  variants: (CrossSellProductsQuery_products_edges_node_variants | null)[] | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: CrossSellProductsQuery_products_edges_node_attributes[];
}

export interface CrossSellProductsQuery_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CrossSellProductsQuery_products_edges_node;
}

export interface CrossSellProductsQuery_products {
  __typename: "ProductCountableConnection";
  edges: CrossSellProductsQuery_products_edges[];
}

export interface CrossSellProductsQuery {
  /**
   * List of the shop's products.
   */
  products: CrossSellProductsQuery_products | null;
}

export interface CrossSellProductsQueryVariables {
  productIds?: (string | null)[] | null;
}
