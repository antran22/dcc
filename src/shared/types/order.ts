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

interface OrderUploadFormat {
  email: string;
  name: string;
  phoneNumber: string;
  address: string;
  paymentOption: string;
  items: {
    quantity: number;
    product?: string;
    combo?: string;
    size?: string;
    color?: string;
  }[];
}

export function transformOrderForUploading(order: Order): OrderUploadFormat {
  return {
    email: order.email,
    name: order.name,
    phoneNumber: order.phoneNumber,
    address: order.address,
    paymentOption: order.paymentOption.toString(),
    items: order.items.map((item) => {
      if (item.selection.type === "product_variant") {
        return {
          quantity: item.quantity,
          product: item.selection.product.id,
          size: item.selection.size?.name,
          color: item.selection.color?.name,
        };
      } else {
        return {
          quantity: item.quantity,
          combo: item.selection.combo.id,
        };
      }
    }),
  };
}
