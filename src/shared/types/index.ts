export type DCCColors =
  | "cyan"
  | "red-soil"
  | "dark-green"
  | "nude"
  | "black"
  | "white"
  | "grey"
  | "dark-grey"
  | "light-grey";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
