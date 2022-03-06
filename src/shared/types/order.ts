import { CartItem } from "#/types";

export enum PaymentOptions {
  COD = "COD",
  BANKING = "BANKING",
}

export interface Order {
  email: string;
  name: string;
  phoneNumber: string;
  address: string;
  paymentOption: PaymentOptions;
  items: CartItem[];
}
