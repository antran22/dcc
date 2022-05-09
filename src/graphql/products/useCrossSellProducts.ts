import {
  productAttributeFragment,
  productMediaFragment,
  productVariantFragment,
} from "@/graphql/products/index";
import {
  CrossSellProductsQuery,
  CrossSellProductsQuery_products_edges_node,
  CrossSellProductsQuery_products_edges_node_variants,
  CrossSellProductsQueryVariables,
} from "./__generated__/CrossSellProductsQuery";
import { gql, useQuery } from "@apollo/client";

export const crossSellQuery = gql`
  query CrossSellProductsQuery($productIds: [ID]) {
    products(
      first: 4
      filter: { ids: $productIds, stockAvailability: IN_STOCK }
    ) {
      edges {
        node {
          id
          name
          slug
          media {
            ...ProductMedia
          }
          variants {
            ...ProductVariant
            quantityAvailable
          }
          attributes {
            ...ProductAttribute
          }
        }
      }
    }
  }
  ${productAttributeFragment}
  ${productMediaFragment}
  ${productVariantFragment}
`;

export type CrossSellProduct = CrossSellProductsQuery_products_edges_node;
export type CrossSellProductVariant =
  CrossSellProductsQuery_products_edges_node_variants;

export const useCrossSellProducts = (
  crossSellIds: string[]
): { products: CrossSellProduct[]; loading: boolean } => {
  const { data: queryResult, loading } = useQuery<
    CrossSellProductsQuery,
    CrossSellProductsQueryVariables
  >(crossSellQuery, { variables: { productIds: crossSellIds } });

  if (!crossSellIds || crossSellIds.length === 0) {
    return { products: [], loading: false };
  }

  if (loading) {
    return { products: [], loading };
  }
  const productEdges = queryResult?.products?.edges;
  if (!productEdges || productEdges.length === 0) {
    return { loading: false, products: [] };
  }
  return {
    loading: false,
    products: productEdges.map((edge) => edge.node),
  };
};
