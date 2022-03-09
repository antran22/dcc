/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ShippingMethodUpdate
// ====================================================

export interface ShippingMethodUpdate_checkoutDeliveryMethodUpdate_checkout_totalPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ShippingMethodUpdate_checkoutDeliveryMethodUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ShippingMethodUpdate_checkoutDeliveryMethodUpdate_checkout_totalPrice_gross;
}

export interface ShippingMethodUpdate_checkoutDeliveryMethodUpdate_checkout {
  __typename: "Checkout";
  /**
   * The sum of the the checkout line prices, with all the taxes,shipping costs, and discounts included.
   */
  totalPrice: ShippingMethodUpdate_checkoutDeliveryMethodUpdate_checkout_totalPrice | null;
}

export interface ShippingMethodUpdate_checkoutDeliveryMethodUpdate {
  __typename: "CheckoutDeliveryMethodUpdate";
  /**
   * An updated checkout.
   */
  checkout: ShippingMethodUpdate_checkoutDeliveryMethodUpdate_checkout | null;
}

export interface ShippingMethodUpdate {
  /**
   * New in Saleor 3.1. Updates the delivery method (shipping method or pick up point) of the checkout. Note: this feature is in a preview state and can be subject to changes at later point.
   */
  checkoutDeliveryMethodUpdate: ShippingMethodUpdate_checkoutDeliveryMethodUpdate | null;
}

export interface ShippingMethodUpdateVariables {
  token: any;
  deliveryId: string;
}
