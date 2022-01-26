import {getLargestImageFormat, StrapiImage} from "#/types";
import _ from "lodash";
import {ImageProps as NextImageProps} from "next/image";
import React from "react";
import Image from "./Image";

interface StrapiResponsiveImageProps
  extends Omit<NextImageProps, "src" | "alt"> {
  image: StrapiImage;
}

const StrapiResponsiveImage: React.FC<StrapiResponsiveImageProps> = (props) => {
  const { image } = props;
  const largestImageFormat = getLargestImageFormat(image);
  const cleanedProps = _.omit(props, "style", "image");
  return (
    <Image
      src={largestImageFormat.url}
      alt={image.alternativeText}
      {...cleanedProps}
    />
  );
};

export default StrapiResponsiveImage;
