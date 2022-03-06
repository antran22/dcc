/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AttributeValue
// ====================================================

export interface AttributeValue {
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
