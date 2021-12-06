export type DCCColors =
  | 'cyan'
  | 'red-soil'
  | 'dark-green'
  | 'nude'
  | 'black'
  | 'white'
  | 'grey';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
