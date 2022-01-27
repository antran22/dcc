import { StrapiImage } from "./image";

export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  thumbnails: StrapiImage[];
  theme_color_code?: string;
  meaning: string;
  meaning_short: string;
  usage: string;
  specifications: string;
  specifications_short: string;
  sizes: ProductSize[];
  colors: ProductColor[];
  cross_sell: Product[];
}

export interface ProductSize {
  id: string;
  name: string;
  description: string;
}

export interface ProductColor {
  id: string;
  name: string;
  color_code: string;
  description: string;
  images: StrapiImage[];
}

export function getProductThumbnail(product: Product): StrapiImage | undefined {
  return product.thumbnails[0];
}
