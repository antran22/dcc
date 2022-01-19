import React from 'react';
import Image from './Image';

import { getLargestImageFormat, IStrapiImage } from '@/redux/apiTypes';
import { ImageProps as NextImageProps } from 'next/image';

interface StrapiResponsiveImageProps
  extends Omit<NextImageProps, 'src' | 'alt'> {
  image: IStrapiImage;
}

const StrapiResponsiveImage: React.FC<StrapiResponsiveImageProps> = (props) => {
  const { image } = props;
  const largestImageFormat = getLargestImageFormat(image);
  return (
    <Image
      src={largestImageFormat.url}
      alt={image.alternativeText}
      {...props}
    />
  );
};

export default StrapiResponsiveImage;
