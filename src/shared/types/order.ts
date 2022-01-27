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
    product: string;
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
    items: order.items.map((item) => ({
      quantity: item.quantity,
      product: item.productVariant.product.id,
      size: item.productVariant.size?.name,
      color: item.productVariant.color?.name,
    })),
  };
}
