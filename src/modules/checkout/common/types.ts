export enum PaymentOptions {
  SHIP_COD = 'SHIP_COD',
  CHUYEN_KHOAN = 'CHUYEN_KHOAN',
}

export interface CheckoutFormDetails {
  email: string;
  name: string;
  phoneNumber: string;
  address: string;
  paymentOption: PaymentOptions;
}
