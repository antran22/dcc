/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductList
// ====================================================

export interface ProductList_category_products_pageInfo {
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

export interface ProductList_category_products_edges_node_attributes_attribute {
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

export interface ProductList_category_products_edges_node_attributes_values {
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

export interface ProductList_category_products_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductList_category_products_edges_node_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductList_category_products_edges_node_attributes_values | null)[];
}

export interface ProductList_category_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ProductList_category_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductList_category_products_edges_node_pricing_priceRange_start_gross;
}

export interface ProductList_category_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ProductList_category_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductList_category_products_edges_node_pricing_priceRange_stop_gross;
}

export interface ProductList_category_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductList_category_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductList_category_products_edges_node_pricing_priceRange_stop | null;
}

export interface ProductList_category_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductList_category_products_edges_node_pricing_priceRange | null;
}

export interface ProductList_category_products_edges_node_media {
  __typename: "ProductMedia";
  /**
   * The URL of the media.
   */
  url: string;
  alt: string;
}

export interface ProductList_category_products_edges_node {
  __typename: "Product";
  id: string;
  slug: string;
  created: any;
  name: string;
  /**
   * List of attributes assigned to this product.
   */
  attributes: ProductList_category_products_edges_node_attributes[];
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductList_category_products_edges_node_pricing | null;
  /**
   * List of media for the product.
   */
  media: ProductList_category_products_edges_node_media[] | null;
}

export interface ProductList_category_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductList_category_products_edges_node;
}

export interface ProductList_category_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  /**
   * Pagination data for this connection.
   */
  pageInfo: ProductList_category_products_pageInfo;
  edges: ProductList_category_products_edges[];
}

export interface ProductList_category {
  __typename: "Category";
  /**
   * List of products in the category.
   */
  products: ProductList_category_products | null;
}

export interface ProductList {
  /**
   * Look up a category by ID or slug.
   */
  category: ProductList_category | null;
}

export interface ProductListVariables {
  category?: string | null;
  after?: string | null;
}
