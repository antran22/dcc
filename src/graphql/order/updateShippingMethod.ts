import apolloClient from "@/graphql/apolloClient";
import {
  ShippingMethodUpdate,
  ShippingMethodUpdateVariables,
} from "./__generated__/ShippingMethodUpdate";
import { gql } from "@apollo/client";
import _ from "lodash";

export async function updateShippingMethod(checkoutToken: string, deliveryId: string) {
  const { data: updateDeliveryResult, errors } = await apolloClient.mutate<
    ShippingMethodUpdate,
    ShippingMethodUpdateVariables
  >({
    mutation: shippingMethodUpdateMutation,
    variables: { token: checkoutToken, deliveryId },
  });

  const amount =
    updateDeliveryResult?.checkoutDeliveryMethodUpdate?.checkout?.totalPrice
      ?.gross?.amount;

  if (errors) {
    throw new Error(
      "unable to update delivery result " + JSON.stringify(errors)
    );
  }

  if (_.isNil(amount)) {
    throw new Error("unable to update delivery result");
  }

  return amount;
}

const shippingMethodUpdateMutation = gql`
  mutation ShippingMethodUpdate($token: UUID!, $deliveryId: ID!) {
    checkoutDeliveryMethodUpdate(token: $token, deliveryMethodId: $deliveryId) {
      checkout {
        totalPrice {
          gross {
            amount
          }
        }
      }
    }
  }
`;
