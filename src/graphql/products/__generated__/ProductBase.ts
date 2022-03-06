/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductBase
// ====================================================

export interface ProductBase_media {
  __typename: "ProductMedia";
  /**
   * The URL of the media.
   */
  url: string;
  alt: string;
}

export interface ProductBase {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  /**
   * List of media for the product.
   */
  media: ProductBase_media[] | null;
}
