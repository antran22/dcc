/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductMediaType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SingleProductList
// ====================================================

export interface SingleProductList_category_products_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface SingleProductList_category_products_edges_node_attributes_attribute {
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

export interface SingleProductList_category_products_edges_node_attributes_values {
  __typename: "AttributeValue";
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Represent value of the attribute value (e.g. color values for swatch attributes).
   */
  value: string | null;
}

export interface SingleProductList_category_products_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SingleProductList_category_products_edges_node_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SingleProductList_category_products_edges_node_attributes_values | null)[];
}

export interface SingleProductList_category_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface SingleProductList_category_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SingleProductList_category_products_edges_node_pricing_priceRange_start_gross;
}

export interface SingleProductList_category_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface SingleProductList_category_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SingleProductList_category_products_edges_node_pricing_priceRange_stop_gross;
}

export interface SingleProductList_category_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: SingleProductList_category_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: SingleProductList_category_products_edges_node_pricing_priceRange_stop | null;
}

export interface SingleProductList_category_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: SingleProductList_category_products_edges_node_pricing_priceRange | null;
}

export interface SingleProductList_category_products_edges_node_media {
  __typename: "ProductMedia";
  type: ProductMediaType;
  /**
   * The URL of the media.
   */
  url: string;
  alt: string;
}

export interface SingleProductList_category_products_edges_node {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  /**
   * List of attributes assigned to this product.
   */
  attributes: SingleProductList_category_products_edges_node_attributes[];
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: SingleProductList_category_products_edges_node_pricing | null;
  /**
   * List of media for the product.
   */
  media: SingleProductList_category_products_edges_node_media[] | null;
}

export interface SingleProductList_category_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SingleProductList_category_products_edges_node;
}

export interface SingleProductList_category_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  /**
   * Pagination data for this connection.
   */
  pageInfo: SingleProductList_category_products_pageInfo;
  edges: SingleProductList_category_products_edges[];
}

export interface SingleProductList_category {
  __typename: "Category";
  /**
   * List of products in the category.
   */
  products: SingleProductList_category_products | null;
}

export interface SingleProductList {
  /**
   * Look up a category by ID or slug.
   */
  category: SingleProductList_category | null;
}

export interface SingleProductListVariables {
  after?: string | null;
}
