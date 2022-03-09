/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddressInput, CheckoutLineInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateCheckout
// ====================================================

export interface CreateCheckout_checkoutCreate_checkout_shippingMethods {
  __typename: "ShippingMethod";
  /**
   * Unique ID of ShippingMethod available for Order.
   */
  id: string;
}

export interface CreateCheckout_checkoutCreate_checkout {
  __typename: "Checkout";
  id: string;
  /**
   * The checkout's token.
   */
  token: any;
  /**
   * Returns True, if checkout requires shipping.
   */
  isShippingRequired: boolean;
  /**
   * Shipping methods that can be used with this checkout.
   */
  shippingMethods: (CreateCheckout_checkoutCreate_checkout_shippingMethods | null)[];
}

export interface CreateCheckout_checkoutCreate {
  __typename: "CheckoutCreate";
  checkout: CreateCheckout_checkoutCreate_checkout | null;
}

export interface CreateCheckout {
  /**
   * Create a new checkout.
   */
  checkoutCreate: CreateCheckout_checkoutCreate | null;
}

export interface CreateCheckoutVariables {
  email: string;
  address?: AddressInput | null;
  lines: (CheckoutLineInput | null)[];
}
