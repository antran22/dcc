/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShortProductDetail
// ====================================================

export interface ShortProductDetail_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface ShortProductDetail_product_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ShortProductDetail_product_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ShortProductDetail_product_pricing_priceRange_stop_gross;
}

export interface ShortProductDetail_product_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ShortProductDetail_product_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ShortProductDetail_product_pricing_priceRange_start_gross;
}

export interface ShortProductDetail_product_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Upper bound of a price range.
   */
  stop: ShortProductDetail_product_pricing_priceRange_stop | null;
  /**
   * Lower bound of a price range.
   */
  start: ShortProductDetail_product_pricing_priceRange_start | null;
}

export interface ShortProductDetail_product_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ShortProductDetail_product_pricing_priceRange | null;
}

export interface ShortProductDetail_product {
  __typename: "Product";
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ShortProductDetail_product_thumbnail | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ShortProductDetail_product_pricing | null;
}

export interface ShortProductDetail {
  /**
   * Look up a product by ID.
   */
  product: ShortProductDetail_product | null;
}

export interface ShortProductDetailVariables {
  productId?: string | null;
}
