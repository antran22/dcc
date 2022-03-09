import { CartItem } from "#/types";
import { CountryCode } from "@/graphql/__generated__/globalTypes";
import { completeOrder, Order } from "./completeOrder";
import { createCheckout } from "./createCheckout";
import { makePayment } from "./makePayment";
import { updateShippingMethod } from "./updateShippingMethod";

export type PaymentMethod = "COD" | "BANK_TRANSFER";
export interface CreateOrderInput {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: string;
  city: string;
  cartItems: CartItem[];
  paymentMethod: PaymentMethod;
}

export async function createOrder({
  phoneNumber,
  firstName,
  lastName,
  cartItems,
  paymentMethod,
  email,
  city,
  address,
}: CreateOrderInput): Promise<Order> {
  const { checkoutToken, deliveryId, checkoutId } = await createCheckout({
    email,
    cartItems,
    address: {
      firstName,
      lastName,
      city,
      phone: phoneNumber,
      country: CountryCode.VN,
      streetAddress1: address,
    },
  });
  const totalAmount = await updateShippingMethod(checkoutToken, deliveryId);
  await makePayment({
    amount: totalAmount,
    paymentMethod: paymentMethod,
    token: checkoutToken,
    checkoutId,
  });
  return completeOrder(checkoutToken);
}
