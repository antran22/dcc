import apolloClient from "@/graphql/apolloClient";
import {
  CompleteCheckoutMutation,
  CompleteCheckoutMutation_checkoutComplete_order,
  CompleteCheckoutMutationVariables,
} from "@/graphql/order/__generated__/CompleteCheckoutMutation";
import { gql } from "@apollo/client";

export type Order = CompleteCheckoutMutation_checkoutComplete_order;

export async function completeOrder(checkoutToken: any) {
  const { data: completeCheckoutResult, errors } = await apolloClient.mutate<
    CompleteCheckoutMutation,
    CompleteCheckoutMutationVariables
  >({
    mutation: completeCheckoutMutation,
    variables: { token: checkoutToken },
  });

  if (errors) {
    throw new Error("unable to complete checkout" + JSON.stringify(errors));
  }
  const order = completeCheckoutResult?.checkoutComplete?.order;
  if (!order) {
    throw new Error("unable to complete checkout");
  }
  return order;
}

const completeCheckoutMutation = gql`
  mutation CompleteCheckoutMutation($token: UUID!) {
    checkoutComplete(token: $token) {
      order {
        id
        number
        status
        total {
          gross {
            amount
            currency
          }
        }
        userEmail
        billingAddress {
          lastName
          firstName
          city
          streetAddress1
          phone
        }
      }
    }
  }
`;
