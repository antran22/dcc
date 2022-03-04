import { gql } from "@apollo/client";
import client from "../apolloClient";
import {
  SingleProductList,
  SingleProductList_category_products_edges_node,
} from "./__generated__/SingleProductList";

export type ProductListItem = SingleProductList_category_products_edges_node;

export async function getProductList(): Promise<ProductListItem[]> {
  let allProducts: ProductListItem[] = [];
  let currentCursor = null;
  while (true) {
    const queryResponse = await client.query<SingleProductList>({
      query: gql`
        query SingleProductList($after: String) {
          category(slug: "single-product") {
            products(channel: "online-vn", first: 10, after: $after) {
              totalCount
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  id
                  slug
                  name
                  attributes {
                    attribute {
                      name
                      slug
                    }
                    values {
                      name
                      value
                    }
                  }

                  pricing {
                    priceRange {
                      start {
                        gross {
                          amount
                        }
                      }
                      stop {
                        gross {
                          amount
                        }
                      }
                    }
                  }

                  media {
                    type
                    url
                    alt
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        after: currentCursor,
      },
    });

    const data: SingleProductList = queryResponse.data;
    const productInThisPage = data.category?.products?.edges.map(
      (edge) => edge.node
    );
    if (productInThisPage) {
      allProducts = allProducts.concat(productInThisPage);
    }
    if (!data.category?.products?.pageInfo.hasNextPage) {
      break;
    }
    currentCursor = data.category?.products?.pageInfo.endCursor;

    if (!currentCursor) {
      break;
    }
  }
  return allProducts;
}
