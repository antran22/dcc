export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  slug: string;
  images: IStrapiImage[];
}

export interface IStrapiImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: string;
  size: number;
  width: number;
  height: number;
}

export interface IStrapiImage {
  id: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail: IStrapiImageFormat;
    small?: IStrapiImageFormat;
    medium?: IStrapiImageFormat;
    large?: IStrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  related: string;
  created_by: string;
  updated_by: string;
}

export function getLargestImageFormat(image: IStrapiImage): IStrapiImageFormat {
  const { large, medium, small, thumbnail } = image.formats;
  return large ?? medium ?? small ?? thumbnail;
}
