/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CrossSellProducts
// ====================================================

export interface CrossSellProducts_products_edges_node_media {
  __typename: "ProductMedia";
  /**
   * The URL of the media.
   */
  url: string;
  alt: string;
}

export interface CrossSellProducts_products_edges_node_variants_attributes_attribute {
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

export interface CrossSellProducts_products_edges_node_variants_attributes_values {
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

export interface CrossSellProducts_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: CrossSellProducts_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (CrossSellProducts_products_edges_node_variants_attributes_values | null)[];
}

export interface CrossSellProducts_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface CrossSellProducts_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CrossSellProducts_products_edges_node_variants_pricing_price_gross;
}

export interface CrossSellProducts_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * The price, with any discount subtracted.
   */
  price: CrossSellProducts_products_edges_node_variants_pricing_price | null;
}

export interface CrossSellProducts_products_edges_node_variants_media {
  __typename: "ProductMedia";
  /**
   * The URL of the media.
   */
  url: string;
  alt: string;
}

export interface CrossSellProducts_products_edges_node_variants {
  __typename: "ProductVariant";
  id: string;
  name: string;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: CrossSellProducts_products_edges_node_variants_attributes[];
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: CrossSellProducts_products_edges_node_variants_pricing | null;
  /**
   * List of media for the product variant.
   */
  media: CrossSellProducts_products_edges_node_variants_media[] | null;
}

export interface CrossSellProducts_products_edges_node {
  __typename: "Product";
  name: string;
  slug: string;
  /**
   * List of media for the product.
   */
  media: CrossSellProducts_products_edges_node_media[] | null;
  /**
   * List of variants for the product.
   */
  variants: (CrossSellProducts_products_edges_node_variants | null)[] | null;
}

export interface CrossSellProducts_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CrossSellProducts_products_edges_node;
}

export interface CrossSellProducts_products {
  __typename: "ProductCountableConnection";
  edges: CrossSellProducts_products_edges[];
}

export interface CrossSellProducts {
  /**
   * List of the shop's products.
   */
  products: CrossSellProducts_products | null;
}

export interface CrossSellProductsVariables {
  productIds?: (string | null)[] | null;
}
