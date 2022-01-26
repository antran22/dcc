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

export function getLargestImageFormat(image: StrapiImage): StrapiImageFormat {
  const { large, medium, small, thumbnail } = image.formats;
  return large ?? medium ?? small ?? thumbnail;
}
