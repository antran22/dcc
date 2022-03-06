/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductAttribute
// ====================================================

export interface ProductAttribute_attribute {
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

export interface ProductAttribute_values {
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

export interface ProductAttribute {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductAttribute_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductAttribute_values | null)[];
}
