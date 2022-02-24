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
  size_guidance: string;
  colors: ProductColor[];
  cross_sell: Product[];
}

export interface ProductListing {
  id: string;
  slug: string;
  title: string;
  price: number;
  thumbnail?: StrapiImage;
  theme_color_code?: string;
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

export function stripDownProductForListing(product: Product): ProductListing {
  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnails[0],
    theme_color_code: product.theme_color_code,
  };
}
