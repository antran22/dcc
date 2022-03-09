/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CompleteCheckoutMutation
// ====================================================

export interface CompleteCheckoutMutation_checkoutComplete_order_total_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CompleteCheckoutMutation_checkoutComplete_order_total {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CompleteCheckoutMutation_checkoutComplete_order_total_gross;
}

export interface CompleteCheckoutMutation_checkoutComplete_order_billingAddress {
  __typename: "Address";
  lastName: string;
  firstName: string;
  city: string;
  streetAddress1: string;
  phone: string | null;
}

export interface CompleteCheckoutMutation_checkoutComplete_order {
  __typename: "Order";
  id: string;
  /**
   * User-friendly number of an order.
   */
  number: string | null;
  status: OrderStatus;
  /**
   * Total amount of the order.
   */
  total: CompleteCheckoutMutation_checkoutComplete_order_total;
  /**
   * Email address of the customer.
   */
  userEmail: string | null;
  billingAddress: CompleteCheckoutMutation_checkoutComplete_order_billingAddress | null;
}

export interface CompleteCheckoutMutation_checkoutComplete {
  __typename: "CheckoutComplete";
  /**
   * Placed order.
   */
  order: CompleteCheckoutMutation_checkoutComplete_order | null;
}

export interface CompleteCheckoutMutation {
  /**
   * Completes the checkout. As a result a new order is created and a payment charge is made. This action requires a successful payment before it can be performed. In case additional confirmation step as 3D secure is required confirmationNeeded flag will be set to True and no order created until payment is confirmed with second call of this mutation.
   */
  checkoutComplete: CompleteCheckoutMutation_checkoutComplete | null;
}

export interface CompleteCheckoutMutationVariables {
  token: any;
}
