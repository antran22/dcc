/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MakePaymentMutation
// ====================================================

export interface MakePaymentMutation_checkoutPaymentCreate_payment {
  __typename: "Payment";
  id: string;
  gateway: string;
  token: string;
}

export interface MakePaymentMutation_checkoutPaymentCreate {
  __typename: "CheckoutPaymentCreate";
  /**
   * A newly created payment.
   */
  payment: MakePaymentMutation_checkoutPaymentCreate_payment | null;
}

export interface MakePaymentMutation_updateMetadata_errors {
  __typename: "MetadataError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface MakePaymentMutation_updateMetadata_item_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface MakePaymentMutation_updateMetadata_item {
  __typename: "App" | "Attribute" | "Category" | "Checkout" | "Collection" | "DigitalContent" | "Fulfillment" | "GiftCard" | "Invoice" | "Menu" | "MenuItem" | "Order" | "Page" | "PageType" | "Payment" | "Product" | "ProductType" | "ProductVariant" | "Sale" | "ShippingMethod" | "ShippingMethodType" | "ShippingZone" | "User" | "Voucher" | "Warehouse";
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (MakePaymentMutation_updateMetadata_item_metadata | null)[];
}

export interface MakePaymentMutation_updateMetadata {
  __typename: "UpdateMetadata";
  errors: MakePaymentMutation_updateMetadata_errors[];
  item: MakePaymentMutation_updateMetadata_item | null;
}

export interface MakePaymentMutation {
  /**
   * Create a new payment for given checkout.
   */
  checkoutPaymentCreate: MakePaymentMutation_checkoutPaymentCreate | null;
  /**
   * Updates metadata of an object.
   */
  updateMetadata: MakePaymentMutation_updateMetadata | null;
}

export interface MakePaymentMutationVariables {
  checkoutId: string;
  paymentMethod: string;
  token: any;
  amount?: any | null;
}
