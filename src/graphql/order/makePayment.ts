import apolloClient from "@/graphql/apolloClient";
import {
  MakePaymentMutation,
  MakePaymentMutationVariables,
} from "./__generated__/MakePaymentMutation";
import { gql } from "@apollo/client";
import _ from "lodash";

export async function makePayment(input: MakePaymentMutationVariables) {
  const { data: makePaymentResult, errors } = await apolloClient.mutate<
    MakePaymentMutation,
    MakePaymentMutationVariables
  >({
    mutation: makePaymentMutation,
    variables: input,
  });

  if (errors) {
    throw new Error("unable to make payment " + JSON.stringify(errors));
  }

  if (_.isNil(makePaymentResult?.checkoutPaymentCreate?.payment?.id)) {
    throw new Error("unable to make payment");
  }
}
const makePaymentMutation = gql`
  mutation MakePaymentMutation(
    $checkoutId: ID!
    $paymentMethod: String!
    $token: UUID!
    $amount: PositiveDecimal
  ) {
    checkoutPaymentCreate(
      input: {
        amount: $amount
        gateway: "mirumee.payments.dummy"
        token: "4000000000000069"
      }
      token: $token
    ) {
      payment {
        id
        gateway
        token
      }
    }

    updateMetadata(
      id: $checkoutId
      input: { key: "Payment Method", value: $paymentMethod }
    ) {
      errors {
        field
        message
      }
      item {
        metadata {
          key
          value
        }
      }
    }
  }
`;
