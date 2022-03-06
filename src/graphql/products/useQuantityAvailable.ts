import { isNumber } from "lodash";
import {
  QuantityAvailable,
  QuantityAvailableVariables,
} from "./__generated__/QuantityAvailable";
import { ProductSelection } from "#/types";
import { gql, useQuery } from "@apollo/client";

interface UseQuantityAvailableResult {
  quantityAvailable?: number;
  loading: boolean;
}

const quantityAvailableQuery = gql`
  query QuantityAvailable($variantId: ID) {
    productVariant(id: $variantId) {
      quantityAvailable(address: { country: VN })
    }
  }
`;

export const useQuantityAvailable = (
  productSelection?: ProductSelection
): UseQuantityAvailableResult => {
  const { loading, error, data } = useQuery<
    QuantityAvailable,
    QuantityAvailableVariables
  >(quantityAvailableQuery, {
    variables: { variantId: productSelection?.variant.id },
  });

  const quantityAvailable = data?.productVariant?.quantityAvailable;

  if (!loading && !error && isNumber(quantityAvailable)) {
    return { quantityAvailable: quantityAvailable, loading: false };
  }
  return { loading: true };
};
