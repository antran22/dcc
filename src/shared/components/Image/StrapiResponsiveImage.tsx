import React from "react";
import Image from "./Image";
import _ from "lodash";

import {getLargestImageFormat, StrapiImage} from "@/redux/apiTypes";
import {ImageProps as NextImageProps} from "next/image";

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
