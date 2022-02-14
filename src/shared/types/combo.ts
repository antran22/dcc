import { StrapiImage } from "#/types/image";
import { Product } from "./product";

export interface Combo {
  id: string;
  slug: string;
  name: string;
  products: Product[];
  meaning_short: string;
  meaning: string;
  content: string;
  images: StrapiImage[];
  price: number;
  theme_color_code: string;
}
