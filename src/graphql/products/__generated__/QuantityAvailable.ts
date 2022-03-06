/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QuantityAvailable
// ====================================================

export interface QuantityAvailable_productVariant {
  __typename: "ProductVariant";
  /**
   * Quantity of a product available for sale in one checkout. Field value will be `null` when no `limitQuantityPerCheckout` in global settings has been set, and `productVariant` stocks are not tracked.
   */
  quantityAvailable: number | null;
}

export interface QuantityAvailable {
  /**
   * Look up a product variant by ID or SKU.
   */
  productVariant: QuantityAvailable_productVariant | null;
}

export interface QuantityAvailableVariables {
  variantId?: string | null;
}
