import { CartItem } from "#/types";
import { at } from "#/utils/misc";
import {
  AddressInput,
  CheckoutLineInput,
} from "@/graphql/__generated__/globalTypes";
import apolloClient from "@/graphql/apolloClient";
import {
  CreateCheckout,
  CreateCheckoutVariables,
} from "@/graphql/order/__generated__/CreateCheckout";
import { gql } from "@apollo/client";

export interface CreateCheckoutInput {
  email: string;
  address: AddressInput;
  cartItems: CartItem[];
}

export async function createCheckout({
  email,
  address,
  cartItems,
}: CreateCheckoutInput) {
  const checkoutLines: CheckoutLineInput[] = cartItems.map((item) => ({
    quantity: item.quantity,
    variantId: item.selection.variant.id,
  }));

  const { data: createCheckoutResult, errors } = await apolloClient.mutate<
    CreateCheckout,
    CreateCheckoutVariables
  >({
    mutation: createCheckoutMutation,
    variables: { email, address, lines: checkoutLines },
  });
  if (errors) {
    throw new Error("unable to create checkout " + JSON.stringify(errors));
  }

  const checkout = createCheckoutResult?.checkoutCreate?.checkout;
  if (!checkout) {
    throw new Error("unable to create checkout");
  }

  const checkoutToken = checkout.token;
  const checkoutId = checkout.id;
  const deliveryId = at(checkout.shippingMethods, 0)?.id;

  if (!checkoutToken || !deliveryId || !checkoutId) {
    throw new Error("unable to create checkout");
  }

  return {
    checkoutId,
    checkoutToken,
    deliveryId,
  };
}

const createCheckoutMutation = gql`
  mutation CreateCheckout(
    $email: String!
    $address: AddressInput
    $lines: [CheckoutLineInput]!
  ) {
    checkoutCreate(
      input: {
        channel: "online-vn"
        email: $email
        languageCode: VI_VN
        shippingAddress: $address
        billingAddress: $address
        lines: $lines
      }
    ) {
      checkout {
        id
        token
        isShippingRequired
        shippingMethods {
          id
        }
      }
    }
  }
`;
