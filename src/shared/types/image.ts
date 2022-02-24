import { getUrlFromAPIPath } from "#/utils/resolveAPIPath";

export interface StrapiImageFormat {
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

export interface StrapiImage {
  id: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
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

export function getLargestImageUrl(image: StrapiImage): string {
  return getUrlFromAPIPath(image.url);
}

export function getSmallestImageUrl(image: StrapiImage): string {
  return getUrlFromAPIPath(image.formats.thumbnail.url);
}
