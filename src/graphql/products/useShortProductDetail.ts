import {
  ShortProductDetail,
  ShortProductDetailVariables,
} from "@/graphql/products/__generated__/ShortProductDetail";
import { gql, useQuery } from "@apollo/client";

const shortProductDetailQuery = gql`
  query ShortProductDetail($productId: ID) {
    product(id: $productId) {
      id
      name
      thumbnail {
        url
        alt
      }
      pricing {
        priceRange {
          stop {
            gross {
              amount
            }
          }
          start {
            gross {
              amount
            }
          }
        }
      }
    }
  }
`;

export const useShortProductDetailQuery = (productId: string | null) => {
  return useQuery<ShortProductDetail, ShortProductDetailVariables>(
    shortProductDetailQuery,
    {
      variables: { productId: productId },
    }
  );
};
