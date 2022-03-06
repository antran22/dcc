/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductPricing
// ====================================================

export interface ProductPricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ProductPricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductPricing_priceRange_start_gross;
}

export interface ProductPricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ProductPricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductPricing_priceRange_stop_gross;
}

export interface ProductPricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductPricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductPricing_priceRange_stop | null;
}

export interface ProductPricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductPricing_priceRange | null;
}
