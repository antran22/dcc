import {
  ProductList,
  ProductList_category_products_edges_node,
} from "@/graphql/products/__generated__/ProductList";
import {
  productAttributeFragment,
  productPricingFragment,
} from "@/graphql/products/fragments";
import { gql } from "@apollo/client";
import client from "../apolloClient";

export type ProductListItem = ProductList_category_products_edges_node;

export type ProductCategory = "single-product" | "combo";

export async function getProductList(
  category: ProductCategory
): Promise<ProductListItem[]> {
  let allProducts: ProductListItem[] = [];
  let currentCursor = null;
  while (true) {
    const queryResponse = await client.query<ProductList>({
      query: gql`
        query ProductList($category: String, $after: String) {
          category(slug: $category) {
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
                    ...ProductAttribute
                  }

                  pricing {
                    ...ProductPricing
                  }

                  media {
                    url
                    alt
                  }
                }
              }
            }
          }
        }
        ${productAttributeFragment}
        ${productPricingFragment}
      `,
      variables: {
        after: currentCursor,
        category,
      },
    });

    const data: ProductList = queryResponse.data;
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
